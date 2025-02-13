const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const joi = require('joi');




const StudentSchema=new Schema({
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
    image:{
        type:String,
        required:true
    }
})

const StudentModel=mongoose.model('student',StudentSchema);

const validateSchema=(data)=>{
    const joischema=joi.object({
        name:joi.string().min(3).max(30),
        email:joi.string().email().trim(true).required(),
        phone:joi.string().required(),
    })
    return joischema.validate(data);
}
module.exports={StudentModel,validateSchema};