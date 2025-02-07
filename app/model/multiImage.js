const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema1=new Schema({
    name:{
        type:String,
        required:true
    },
  
    images:{
        type:[String],
    }
})

const StudentModel1=mongoose.model('student1',StudentSchema1);
module.exports=StudentModel1;