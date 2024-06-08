import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { randomBytes } from "crypto";

const app = express();
const secret = randomBytes(16).toString("hex");

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
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

app.get("/", (_, res) => {
    res.send(`<h1>Welcome</h1> <a href="/login">Login<a/>`);
});

app.get("/login", (_, res) => {
    res.sendFile(import.meta.dirname + "/index.html");
});

app.post("/control", (_, res) => {
    res.send("ok");
});

app.listen(80);
