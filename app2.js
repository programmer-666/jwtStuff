import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const createToken = (data) => {
    return jsonwebtoken.sign(data, "secret", { algorithm: "HS256", expiresIn: "15s" });
};

const authentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jsonwebtoken.verify(token, "secret", (_, data) => {
        if (data !== undefined) {
            console.log(data);
            next();
        } else {
            res.sendStatus(401);
        }
    });
};

app.post("/login", (req, res) => {
    if (req.body.username === "klx" && req.body.password === "123") {
        if (req.cookies.token === undefined) {
            // res.cookie("token", createToken(req.body), { maxAge: 30 * 1000 });
            res.send({ token: createToken(req.body) });
        } else {
            res.status(201).send();
        }
    } else {
        res.status(401).send();
    }
});

app.get("/profile", authentication, (req, res) => {
    res.send("hi");
});

app.listen(80);
