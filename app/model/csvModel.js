const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const csvSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
   
})

const csvModel=mongoose.model('csvmodel',csvSchema);
module.exports=csvModel;