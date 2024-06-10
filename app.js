import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
// middlewares

const mockUsers = [
    { username: "klx", password: "123" },
    { username: "asd", password: "123" },
    { username: "dsa", password: "123" },
];
// mocks

const secret = randomBytes(16).toString("hex");

const generateToken = (user) => {
    const payload = {
        username: user.name,
        password: user.password,
    };

    return jsonwebtoken.sign(payload, secret, { expiresIn: "15m" });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
};
// JWT functions and secret

const authentication = (req, res, next) => {
    if (mockUsers.find((user) => user.username === req.body.username)) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) return res.sendStatus(401);

        generateToken(req.body);
        next();
    } else {
        res.send("failed");
    }
};

app.get("/", (_, res) => {
    res.send(`<h1>Welcome</h1> <a href="/login">Login<a/>`);
});

app.get("/login", (_, res) => {
    res.sendFile(import.meta.dirname + "/index.html");
});

app.post("/control", authentication, (req, res) => {
    console.log();
    console.log(req.body);
});

app.get("/panel", (req, res) => {});

app.listen(80);
