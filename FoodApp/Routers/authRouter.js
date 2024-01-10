const express = require('express');
const authRouter = express.Router();    // this is used for creating the router
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY =process.env.JWT_KEY;

// authRouter
//     .route('/signup')
//     .get(getSignUp)
//     .post(postSignUp);

// authRouter
//     .route('/login')
//     .post(loginUser);

// function getSignUp(req,res){
//     res.sendFile('../Public/index.html' , {root:__dirname});
// };

// async function postSignUp(req,res){
//     let dataobj = req.body;
//     let user1 = await userModel.create(dataobj);
//     // let obj = req.body;
//     console.log('backend' , user1);

//     res.json({
//         message : "User got successfully",
//         data:user1
//     });
// };






module.exports = authRouter;