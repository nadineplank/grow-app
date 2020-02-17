const express = require("express");
const app = express();
const compression = require("compression");
const bcrypt = require("./bcrypt");

const {
    addUser,
    getUser,
    verify,
    updatePassword,
    storeCode,
    updateImage
} = require("./db");

const csurf = require("csurf");
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

pp.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: secrets.SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(
    express.urlencoded({
        extended: false
    })
);

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
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    let first = req.body.first,
        last = req.body.last,
        email = req.body.email;

    ///// hash the submitted password
    bcrypt.hash(req.body.password).then(hashedPass => {
        // put the first, last, email and hashed password into the users table
        addUser(first, last, email, hashedPass)
            .then(function(data) {
                // upon success put the user's id into req.session and redirect to home
                req.session.userId = data.rows[0].id;
                req.session.email = data.rows[0].email;
                res.json(data.rows[0]);
            })
            // upon failure, re-render the register template with an error message
            .catch(function(err) {
                console.log("err in register: ", err);
                res.sendStatus(500);
            });
    });
});

app.post("/login", (req, res) => {
    let email = req.body.email,
        password = req.body.password;
    // - find the info from the user's table by the submitted email address
    getUser(email)
        .then(data => {
            // - compare the submitted password to the saved hashed password from the database using bcrypt's compare
            bcrypt.compare(password, data[0].password).then(result => {
                if (result) {
                    req.session.userId = data[0].id;
                    req.session.email = data[0].email;
                    res.json({ success: true });
                } else {
                    // - if there is no match, re-render the template with an error message
                    res.json({ success: false });
                }
            });
        })
        .catch(err => {
            console.log("error in login: ", err);
            res.json({
                success: false
            });
        });
});

app.get("/logout", (req, res) => {
    (req.session.userId = null), res.redirect("/");
});

app.post("/reset", requireLoggedOutUser, (req, res) => {
    const secretCode = cryptoRandomString({ length: 6 });
    let email = req.body.email,
        message = "Here is your code for reseting: " + secretCode;

    getUser(email)
        .then(data => {
            if (data) {
                res.json(data[0]);
                sendEmail(email, message, "Reset your password")
                    .then(() => {
                        console.log("SendEmail was successfull: ");
                    })
                    .catch(err => {
                        console.log("error in sendEmail: ", err);
                    });

                storeCode(email, secretCode).then(result => {
                    console.log("StoreCode worked!: ", result);
                });
            } else {
                res.json(false);
            }
        })
        .catch(err => {
            console.log("Error in reset: ", err);
            res.json(false);
        });
});

app.post("/verify", requireLoggedOutUser, (req, res) => {
    let email = req.body.email,
        code = req.body.code,
        password = req.body.password;

    verify(email)
        .then(data => {
            if (data[0].code === code) {
                bcrypt
                    .hash(password)
                    .then(hashedPass => {
                        updatePassword(email, hashedPass)
                            .then(function(data) {
                                res.json(data);
                            })
                            .catch(function(err) {
                                console.log("err in setNewPassword: ", err);
                                res.json(false);
                            });
                    })
                    .catch(err => {
                        console.log("Error in bcyrpt: ", err);
                        res.json(false);
                    });
            } else {
                res.json(false);
            }
        })
        .catch(err => {
            console.log("Error in verify: ", err);
        });
});

app.get("/user", (req, res) => {
    let email = req.session.email;

    getUser(email)
        .then(data => {
            res.json({
                first: data[0].first,
                last: data[0].last,
                id: data[0].id
            });
        })
        .catch(err => {
            console.log("error in GET /user: ", err);
        });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    let file = s3Url + req.file.filename,
        id = req.session.userId;

    updateImage(file, id)
        .then(data => {
            res.json(data.rows[0].image);
        })
        .catch(err => {
            console.log("Error in updateImage: ", err);
            res.sendStatus(500);
            res.json(false);
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

server.listen(8080, function() {
    console.log("I'm listening.");
});
