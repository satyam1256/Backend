
const userModel = require('../models/userModel');

// function setCookies(req,res){
//     // res.setHeader('Set-Cookie','isloggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24*7 , secure:true ,httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('Cookies has been set');
// }

// function getCookies(req,res){``
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send('Cookies has been set');
// }


module.exports.getUser = async function getUser(req,res){
    // '?' sumbol is used to set a query in get requests 
    // console.log(req.query);
    // res.send(users);

    let id  = req.id;
    let user = await userModel.findById(id);
    if(user){
        return res.json({
            data:user
        });
    }
    else{
        return res.json({
            message:"user not found"
        });
    }
    

};

module.exports.updateUser = async function updateUser(req,res){
    // console.log(req.body);
    // users = req.body;
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataTobeUpdated = req.body;
        if(user){
            const keys = [];
            for(key in dataTobeUpdated){
                keys.push(key);
            }

            for(let i=0;i<keys.length;i++){
                user[keys[i]] = dataTobeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "successfully updated the data",
                data:user

            });
        }
        else{
            res.json({
                message:"user not found"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
    // let user = await userModel.findOneAndUpdate({name:"Satyam"},dataTobeUpdated);
    // for(key in dataTobeUpdated){
    //     users[key] = dataTobeUpdated[key];
    // }
    
};

module.exports.deleteUser = async function deleteUser(req,res){
    // console.log(req.body);
    // users = req.body;
    // users = {};
    try{
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(user){
            await user.remove();
            res.json({
                message: "successfully deleted the data",
                data:user
            });
        }
        else{
            res.json({
                message:"user not found"
            });
        }
    }
    catch(err){
        message:err.message
    }

};

module.exports.getAllUser = async function getAllUser(req,res){
    console.log(req.roles);
    if(req.roles != 'admin'){
        return res.status(401).json({
            message:"You are not authorised",
            statusCode:401
        });
    }
    let user = await userModel.find();
    return res.json({
        message:"got all the users",
        data:user
    });
};
