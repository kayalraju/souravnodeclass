const StudentModel=require('../model/student')
const path = require('path');
const fs = require('fs');
class HomeController {

async homepge(req,res){
   res.render('home',{
    title:"home page",
   
   })

}
async list(req,res){
    try{
        const result= await StudentModel.find();
        res.render('crud/list',{
            title:"list page",
            data:result
           })
        
    }catch(error){
        console.log(error);
    }
   
}
async addForm(req,res){
   res.render('crud/add',{
    title:"add page",
  
   })
}

async createStudent(req,res){
  //console.log('student',req.body);
  try{
    const {name,email,phone}=req.body;

   const stuData= new StudentModel({
        name,
        email,
        phone
    })
    if(req.file){
        stuData.image=req.file.path
    }
    const result= await stuData.save();
    if(result){
        res.redirect('/list')
    }else{
        res.redirect('/add')
    }

}catch(error){
   console.log(error);
   
}
  
}

}

module.exports = new HomeController()