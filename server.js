import "dotenv/config";
import express from "express";
import passport from "passport";
import session from "express-session";
import "./utils/passport.js"

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send(`My Node.JS APP`);
});

app.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        access_type: "offline",
        scope: ["email", "profile"],
    }),
    (req, res) => {
        if (!req.user) {
            res.status(400).json({ error: "Authentication failed" });
        }
        res.status(200).json(req.user);
    }
);

const start = async () => {
    try {
        app.listen(port, () => console.log(`server is running on port ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();