const jwt = require('jsonwebtoken');
const JWT_KEY = require("../secrets.js")

let flag = false; // user logged in or not
function protectRoute(req,res,next){
    if(req.cookies.login){
        console.log(req.cookies);
        let isVerified = jwt.verify(req.cookies.login , JWT_KEY);
        if(isVerified){
            next();
        }
        else{
            return res.json({
                message:"User not allowed"
            })
        }
    }
    else{
        return res.json({
            message:"operation not allowed"
        })
    }
};

module.exports = protectRoute;