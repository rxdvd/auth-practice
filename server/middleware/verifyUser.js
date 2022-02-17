const jwt = require("jsonwebtoken");

function verifyUser(req, res, next){
    try{
        const header = req.header("Authorization") || "";
        if(header.indexOf("Bearer ") === 0){
            const token = header.slice(7);
            res.locals.jwt = jwt.verify(token, process.env.JWT_SECRET);
        }
        next();
    }catch (err){
        next();
    }
}

module.exports = verifyUser;
