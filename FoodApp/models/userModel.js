const mongoose = require('mongoose');
const emailvalidator = require('email-validator');
const bcrypt = require('bcrypt')

// DataBase Connection
const db_link = "mongodb+srv://Satyam:Haz61666@cluster0.ter1i9u.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');
})
.catch(function(er){
    console.log(er);
});



// Schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailvalidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    },
    roles:{
        type:String,
        enum:['admin','user','restaurant owner' , 'delivery boy'],
        default:'user'
    },
    pImage:{
        type:String,
        default:"default.jpg"
    }
});

//  Pre and Post Hooks in mongoose
// before saving the data in the database 
// userSchema.pre('save',function(){
//     console.log('Inside pre save');
// });

// after saving the data in the database
// userSchema.post('save',function(){
//     console.log('Inside post save');
// });

userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});


// userSchema.pre('save', async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password,salt);
//     // console.log(hashedString);
//     this.password = hashedString;
// });
// Model

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;