const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const compression = require("compression");
const { hash, compare } = require("./bcrypt");

const {
    addUser,
    getUser,
    verify,
    updatePassword,
    storeCode,
    updateImage,
    addPlant,
    getPlants
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

app.use(
    cookieSession({
        secret: "I'm a secret",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(csurf());

/////// DO NOT TOUCH

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

/////// DO NOT TOUCH

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("./public"));

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

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

app.get("/logout", (req, res) => {
    (req.session.userId = null), res.redirect("/");
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
    let email = req.session.email;

    try {
        const data = await getUser(email);
        res.json({
            first: data[0].first,
            last: data[0].last,
            id: data[0].id
        });
    } catch (err) {
        console.log("error in GET /user: ", err);
    }
});

// PLANTS

app.post("/plants", async (req, res) => {
    let name = req.body.name,
        type = req.body.type,
        user_id = req.session.userId;
    console.log("req.body from POST /plants:", req.body);

    try {
        const data = await addPlant(name, type, user_id);
        console.log("storing plant worked: ", data.id);
        res.json(data);
    } catch (err) {
        console.log("error in addPlant: ", err);
    }
});

app.get("/plants", async (req, res) => {
    let user_id = req.session.userId;

    try {
        const data = await getPlants(user_id);
        console.log("data from getPlants: ", data);
        res.json({
            name: data[0].name,
            id: data[0].id,
            image: data[0].image || "/default.png"
        });
    } catch (err) {
        console.log("error in getPlants: ", err);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    let file = s3Url + req.file.filename,
        id = req.session.userId;

    try {
        const data = await updateImage(file, id);
        res.json(data.rows[0].image);
    } catch (err) {
        console.log("Error in updateImage: ", err);
        res.sendStatus(500);
        res.json(false);
    }
});

//////////

////// HAS TO BE THE LAST ROUTE ///////
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

//////////////////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
