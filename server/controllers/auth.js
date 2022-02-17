const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", async (req, res) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.createNew({
            username: req.body.username,
            password: hashedPass
        });
        res.json({
            success: true,
            ...newUser
        });
    } catch (err) {
        res.status(409).json({
            success: false,
            error: err
        });
    }
});

router.post("/login", async (req, res) => {
    try{
        const user = await User.byUsername(req.body.username);
        if(!user) throw new Error();

        const isAuth = await bcrypt.compare(req.body.password, user.password);
        if(!isAuth) throw new Error();

        const token = jwt.sign(
            { username: user.username }, 
            process.env.JWT_SECRET
        );

        res.json({
            login: true,
            token: token
        });
    }catch(err){
        res.status(401).json({
            login: false,
            message: "Authentication failed."
        });
    }
});

module.exports = router;
