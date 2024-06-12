import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import jsonwebtoken from "jsonwebtoken";
import morgan from "morgan";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(cookieParser());
// Middlewares

const generateToken = (data) => {
    return jsonwebtoken.sign(data, "secret", { expiresIn: "60s", algorithm: "HS512" });
};
// JWT Functions
const authentication = (req, res, next) => {
    const token = req.cookies["tokidoki"];

    try {
        if (jsonwebtoken.verify(token, "secret", { algorithms: ["HS512"] })) {
            res.sendFile(import.meta.dirname + "/views/alin.html");
        }
    } catch (Err) {
        if (req.url === "/login" || req.url === "/loginControl") {
            next();
        }
    }
};

const tokenControl = (req, res, next) => {
    const token = req.cookies["tokidoki"];

    try {
        if (jsonwebtoken.verify(token, "secret", { algorithms: ["HS512"] })) {
            next();
        }
    } catch (Err) {
        res.redirect("/login");
    }
};
// Auth Functions

app.get("/", (_, res) => {
    res.sendFile(import.meta.dirname + "/views/index.html");
});

app.get("/login", authentication, (_, res) => {
    res.sendFile(import.meta.dirname + "/views/login.html");
});

app.post("/loginControl", authentication, (req, res) => {
    if (req.body.username === "klx" && req.body.password === "123") {
        res.cookie("tokidoki", generateToken({ username: req.body.username }), {
            httpOnly: true,
            maxAge: 60 * 1000,
        });

        res.sendFile(import.meta.dirname + "/views/success.html");
    } else {
        res.sendFile(import.meta.dirname + "/views/incorrect.html");
    }
});

app.get("/profile", tokenControl, (req, res) => {
    res.json(req.headers);
});
// Routes

app.listen(3000);
