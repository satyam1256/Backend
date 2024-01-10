const express = require('express');
const userRouter = express.Router();
// const protectRoute = require('../Routers/authHelper');
require("dotenv").config();
const { getUser , getAllUser , updateUser , deleteUser} = require('../controller/userController.js');
const { signup , login , IsAuth , protectRoute } = require('../controller/authController.js');
const app = express();

// user related routes
userRouter.route("/:id")
.patch(updateUser)
.delete(deleteUser)



userRouter
.route('/signup')
.post(signup)


userRouter
.route('/login')
.post(login)


// Profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

// admin related work
// userRouter.use(IsAuth(['admin'])); 
userRouter
.route('/')
.get(getAllUser)





module.exports = userRouter;
