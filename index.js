const express = require("express");
const app = express();
const server = require("http").Server(app);
const cookieSession = require("cookie-session");
const io = require("socket.io")(server, { origins: "localhost:8080" });

const csurf = require("csurf");
const compression = require("compression");
const { hash, compare } = require("./bcrypt");
const moment = require("moment");

const {
    addUser,
    getUser,
    verify,
    updatePassword,
    storeCode,
    updatePlantImage,
    updateProfileImage,
    addPlant,
    getPlants,
    updatePlant,
    deletePlant,
    setReminder,
    setTimeDiff,
    setWaterNeed,
    setAsWatered
} = require("./db");

const { requireLoggedOutUser } = require("./middleware");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const s3 = require("./s3");
const { s3Url } = require("./config");

app.use(compression());

let secrets;
if (process.env.NODE_ENV != "production") {
    secrets = require("./secrets");
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    secrets = process.env;
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.json());

// cookies
const cookieSessionMiddleware = cookieSession({
    secret: secrets.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

/// csurf
app.use(csurf());

app.use(
    express.urlencoded({
        extended: false
    })
);

/////// DO NOT TOUCH -  multer file upload ////////
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

/////// DO NOT TOUCH

app.use(express.static("./public"));

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

///////////   AUTH    ////////

app.get("/register", function(req, res) {
    if (req.session.userId) {
        res.redirect("/login");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", async (req, res) => {
    let first = req.body.first,
        last = req.body.last,
        email = req.body.email,
        password = req.body.password;

    try {
        const hashedPass = await hash(password);

        const data = await addUser(first, last, email, hashedPass);
        req.session.userId = data.rows[0].id;
        req.session.email = data.rows[0].email;
        res.json({ success: true });
    } catch (err) {
        console.log("err in register: ", err);
        res.sendStatus(500);
    }
});

app.post("/login", async (req, res) => {
    let email = req.body.email,
        password = req.body.password;

    try {
        const data = await getUser(email);
        const result = compare(password, data[0].password);

        if (result) {
            req.session.userId = data[0].id;
            req.session.email = data[0].email;
            res.json({ success: true });
        } else {
            // - if there is no match, re-render the template with an error message
            res.json({ success: false });
        }
    } catch (err) {
        console.log("error in login: ", err);
        res.json({
            success: false
        });
    }
});

app.post("/reset", requireLoggedOutUser, async (req, res) => {
    const secretCode = cryptoRandomString({ length: 6 });
    let email = req.body.email,
        message = "Here is your code for reseting: " + secretCode;

    try {
        const data = await getUser(email);
        if (data) {
            res.json(data[0]);
            await sendEmail(email, message, "Reset your password");
            await storeCode(email, secretCode);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.log("Error in reset: ", err);
        res.json(false);
    }
});

app.post("/verify", requireLoggedOutUser, async (req, res) => {
    let email = req.body.email,
        code = req.body.code,
        password = req.body.password;

    try {
        const data = await verify(email);
        if (data[0].code === code) {
            const hashedPass = await hash(password);
            const data = await updatePassword(email, hashedPass);
            res.json(data);
        } else {
            res.json(false);
        }
    } catch (err) {
        console.log("Error in verify: ", err);
    }
});

app.get("/user", async (req, res) => {
    let id = req.session.userId;

    try {
        const data = await getUser(id);

        res.json({
            first: data[0].first,
            last: data[0].last,
            id: data[0].id,
            image: data[0].image || "/default-profile.png",
            email: data[0].email
        });
    } catch (err) {
        console.log("error in GET /user: ", err);
    }
});

/// IMAGE UPLOAD PROFILE //
app.post(
    "/upload-profile-image",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const file = s3Url + req.file.filename,
            id = req.session.userId;

        if (req.file) {
            updateProfileImage(file, id)
                .then(data => {
                    res.json(data[0].image);
                })
                .catch(err => {
                    console.log("Error in updateImage: ", err);
                });
        }
    }
);

// PLANTS

app.post("/add-plant", async (req, res) => {
    let name = req.body.name,
        type = req.body.type,
        location = req.body.location,
        date = req.body.date,
        user_id = req.session.userId,
        last_watered = new Date();
    console.log("req.body from POST add-plant", req.body);
    try {
        const data = await addPlant(
            name,
            type,
            location,
            user_id,
            date,
            last_watered
        );
        console.log(data.rows[0].id);
        req.session.plantId = data.rows[0].id;
        res.json(data);
    } catch (err) {
        console.log("error in addPlant: ", err);
    }
});

app.post("/edit-plant/:id", async (req, res) => {
    const id = req.params.id,
        name = req.body.name,
        type = req.body.type,
        location = req.body.location,
        date = req.body.date;

    try {
        const data = await updatePlant(name, type, location, date, id);

        res.json(data[0]);
    } catch (err) {
        console.log("error in /POST edit-plant", err);
    }
});

app.post("/delete-plant", async (req, res) => {
    const id = req.body.id;
    try {
        await deletePlant(id);
        res.json({
            success: true
        });
    } catch (err) {
        console.log("error in deletePlant: ", err);
    }
});

/// IMAGE UPLOAD PLANT //

app.post(
    "/upload-plant-image/",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const file = s3Url + req.file.filename,
            id = req.session.plantId;

        if (req.file) {
            updatePlantImage(file, id)
                .then(data => {
                    req.session.plantId = null;
                    res.json(data[0]);
                })
                .catch(err => {
                    console.log("Error in uploadImage: ", err);
                });
        }
    }
);

app.post(
    "/update-plant-image/:id",
    uploader.single("file"),
    s3.upload,
    (req, res) => {
        const file = s3Url + req.file.filename,
            id = req.params.id;

        if (req.file) {
            updatePlantImage(file, id)
                .then(data => {
                    res.json(data[0]);
                })
                .catch(err => {
                    console.log("Error in updateImage: ", err);
                });
        }
    }
);

///// REMINDER /////
app.post("/set-reminder/:id", async (req, res) => {
    const id = req.params.id,
        reminder = req.body.reminder;
    // last_watered = new Date();

    try {
        const { data } = await setReminder(id, reminder);
        res.json(data);
    } catch (err) {
        console.log("error in /POST set-reminder: ", err);
    }
});

////// MARK AS WATERED ///////

app.post("/mark-as-watered", async (req, res) => {
    console.log("radio button reached server");
    const id = req.body.id,
        last_watered = new Date();

    console.log("req.body from /POST mark-as-watered: ", req.body);

    try {
        const { data } = await setAsWatered(id, last_watered);
        res.json(data);
    } catch (err) {
        console.log("error in /POST mark-as-watered: ", err);
    }
});

////////// LOGOUT /////////

app.get("/logout", (req, res) => {
    (req.session.userId = null), res.redirect("/");
});

////// HAS TO BE THE LAST ROUTE ///////
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////////////////////////////////////

server.listen(8080, function() {
    console.log("I'm listening.");
});

// SERVER SIDE SOCKET CODE //

io.on("connection", async function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId,
        userSocket = socket.id;

    let plantData = await getPlants(userId);

    console.log("plantData from socket: ", plantData);
    let date = new Date();
    for (let x of plantData) {
        console.log("x: ", x);
        let timeDiff = moment(x.last_watered).diff(date, "days");

        timeDiff = Math.abs(timeDiff);
        console.log("timeDiff: ", timeDiff);
        if (timeDiff > 1) {
            setTimeDiff(x.id, timeDiff);
            if (x.time_diff >= x.reminder) {
                setWaterNeed(x.id, true);
            }
        }
    }

    io.to(userSocket).emit("plant data", plantData);
});
