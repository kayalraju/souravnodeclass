const StudentModel1=require('../model/multiImage')
const path=require('path');
const fs=require('fs');
const { StudentModel } = require('../model/student');
const slug=require('slugify');
const { Validator } = require('node-input-validator');


class ApiController {

async createStudent(req,res){
    //console.log('ssss',req.body);
    try{
        const rules = {
            name: "required|string|minLength:3|maxLength:20",
            // price: "required|numeric",
            // size: "required|string",
            // description: "required|string|minLength:3|maxLength:100",
            // image: "required|array",
            // rating: "required|object",
            // "rating.rate": "required|numeric",
            // "rating.count": "required|numeric",
            // feature: "required|boolean",
          };
          const {name,email,phone}=req.body;
          const v = new Validator(name,email,phone, rules);
          const matched = await v.check();
          if (!matched) {
            return res.status(400).json({
              status: 400,
              error: v.errors,
            });
          }

       const stuData= new StudentModel({
            name,
            email,
            phone,
            slug:slug(name)
        })
        if(req.file){
            stuData.image=req.file.path
        }
        const result= await stuData.save();
        res.status(201).json({
            message:"data created",
            data:result
        })

    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }

}


//get student
async getstudent(req,res){
  
    try{
       const Data= await StudentModel.find();
     
        res.status(201).json({
            message:"data fetch successfully",
            data:Data
        })

    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }

}
async editstudent(req,res){
  
    try{
        const {id}=req.params;
       const Data= await StudentModel.findById(id);
     
        res.status(201).json({
            message:"get single data",
            data:Data
        })

    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }

}


async updatetudent(req,res){
    try{
        const {id}=req.params;
        const {name,email,phone}=req.body;
        const Data= await StudentModel.findByIdAndUpdate(id,{
            name,
            email,
            phone
        })
        res.status(201).json({
            message:"data updated successfully",
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }   

}



async deletestudent(req,res){
    try{
        const {id}=req.params;
        const Data= await StudentModel.findByIdAndDelete(id);
        res.status(201).json({
            message:"data deleted successfully",
        })
    }catch(error){
        res.status(400).json({
            message:error.message
        })
    }

}


//multiple image upload

async multipleImage(req,res){
    try{
        const {name}=req.body;
        const images=req.files.map(file=>file.path);
        const multi=new StudentModel1({name,images})
        const result= await multi.save();
       
        // if(req.files){
        //     req.files.forEach(element => {
        //         stuData.image.push(element.path)
        //     });
        // }
       
        res.status(201).json({
            message:"data created",
            data:result
        })

    }catch(err){
        console.log(err);
        
    }
}
}

module.exports=new ApiController();