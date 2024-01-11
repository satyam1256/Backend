const express = require('express');   // this is used for creating the router
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY =process.env.JWT_KEY;
module.exports.signup = async function signup(req,res){
    // username , password , email 
    // if already exist the email then send asking for login
    // if new user then add the details in the database
    // res.send(req.body);
    res.redirect("/login")
    try{
        let dataobj = req.body;
        console.log(dataobj.email);
        let user1 = await userModel.create(dataobj);
       
        if(user1){
            res.json({
                message : "User Signed Up successfully",
                data:user1
            });
            res.redirect('/user/userprofile');
            
        }
        else{
            res.json({
                message:"Error in signing up! please check the details and try again"
            });
        }
    }
    catch(err){
        message:err.message
    }

    
};

module.exports.login = async function login(req,res){ 
    try{
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                // bcrypt -> compare
                if(data.password == user.password){
                    let uid = user["_id"];
                    let token = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',token , {httpOnly:true});
                    // res.redirect('/user/profile');
                    return res.json({
                        message:"User found",
                        userDetails: data
                    });
                    
                }else{
                    // res.redirect('/auth/login');
                    // res.redirect('/user/login');
                    return res.json({
                        message:"Wrong Credentials"
                    })
                    
                }
            }
            else{
                // res.redirect('/user/signup');
                return res.json({
                    message:"User not found"
                })
                
            }
        }
        else{
            // res.redirect('/user/login');
            return res.json({
                message:"Please Enter the Details"
            });
            
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
};


module.exports.IsAuth = async function IsAuth(roles){
    return async function(req,res,next){
        if(roles.includes(req.roles)==true){
            next(); 
        }
        else{
            res.status(401).json({
                message:"You are not authorised"
            });
        }
    }
};


module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        if(req.cookies.login){
            console.log(req.cookies);
            token = req.cookies.login;
            let payload = jwt.verify(token , JWT_KEY);
            if(payload){
                // payload gives unique id from mongodb i.e  uid
                console.log('payload token - ' , payload);
                const user = await userModel.findById(payload.payload);
                req.roles = user.roles;
                req.id = user.id;
                console.log(req.roles);
                console.log(req.id);
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
                message:"Please login again"
            });
        }
    }
    catch(err){
        return res.json({
            message:err.message
        })
    }
};