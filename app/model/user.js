
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_verified: { type: Boolean, default: false },
    image:{
        type:String,
        default:'image.png'
    }
})

const UserModel=mongoose.model('user',UserSchema);


module.exports=UserModel