const express = require("express");
const app = express();
const cors = require("cors");

const verifyUser = require("./middleware/verifyUser");

app.use(cors());
app.use(express.json());
app.use(verifyUser);

const authRoutes = require("./controllers/auth");
app.use("/", authRoutes);

const User = require("./models/user");

app.get("/", async (req, res) => {
    try{
        let message = "hello world";
        if(res.locals.jwt){
            let user = await User.byUsername(res.locals.jwt.username);
            if(user) message = user.greeting;
        }
        res.json({
            message: message
        });
    }catch (err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

module.exports = app;
