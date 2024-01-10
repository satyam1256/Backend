const express = require('express');
const { before } = require('lodash');
const app = express();
const userModel = require('./FoodApp/models/userModel');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

const static_path = path.join(__dirname, "./FoodApp/public");
app.use(express.static(static_path));



 // It is a middleware used to parse JSON data to Javascript object.

const userRouter = require('./FoodApp/Routers/userRouter');
// const authRouter = require('./FoodApp/Routers/authRouter');
app.use('/user',userRouter);
// app.use('/auth',authRouter);




app.listen(port , ()=>{
    console.log(`Server is listening at port ${port}`);
});



