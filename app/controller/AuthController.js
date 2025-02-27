const { hashPassword, comparePassword } = require('../middleware/Auth');
const User=require('../model/user')
const jwt = require('jsonwebtoken');

class AuthController {


async register(req,res){
    try{
        const  {name,email,phone,password}=req.body;
        if(!name || !email || !phone || !password){
            return res.status(400).json({
                message:'All fields are required'
            })
        }
        const existuser=await User.findOne({email});
        if(existuser){
            return res.status(400).json({
                message:'User already exist'
            })
        }
      const hashedPassword= await hashPassword(password)
      const userData=new User({
        name,email,phone,password:hashedPassword
      })
      const user=await userData.save();
      res.status(201).json({
        message:'User created successfully',
        data:user
      })

    }catch(error){
        console.log(error);
        
    }

}


    async login(req,res){
        try{
            const {email,password}=req.body
            if(!email || !password){
                return res.status(400).json({
                    message:'All fields are required'
                })
            }
            const Esistinguser=await User.findOne({email});
            console.log(Esistinguser);
            
            if(!Esistinguser){
                return res.status(400).json({
                    message:'User not found'
                })
            }
           const ismatch=await comparePassword(password,Esistinguser.password)
           if(!ismatch){
            return res.status(400).json({
                message:'Invalid Credentials'
            })
           }
           const token=jwt.sign({
            _id:Esistinguser._id,
            name:Esistinguser.name,
            email:Esistinguser.email,
           },process.env.JWT_SECRECT_KEY,{expiresIn:'1h'})

           return res.status(200).json({
            message:'Login Successfully',
            user:{
                _id:Esistinguser._id,
                name:Esistinguser.name,
                email:Esistinguser.email
            },
            token:token,
           })

        }catch(error){

        }

    }


    async dashboard(req,res){

        return res.status(200).json({
            message:'Welcome to dashboard',
            data:req.user
        })

    }


    async profile(req,res){
        return res.status(200).json({
            message:'Welcome to profile',
            data:req.user
        })
   
    }



    async updatePassword(req,res){
        try{
            const user_id=req.body.user_id;
            const {password}=req.body;
            if(!password){
                return res.status(400).json({
                    message:'Password is required'
                })
            }
            const userdata=await User.findOne({_id:user_id})
            if(userdata){
               const newPassword= await hashPassword(password)
               
              await User.findByIdAndUpdate(
                {_id:user_id},
                {
                    $set:{
                        password:newPassword
                    }
                })
                return res.status(200).json({
                    message:'Password updated successfully',
                })
            }else{
                return res.status(400).json({
                    message:'failed to update password'
                })
            }

        }catch(error){
            console.log(error);
            

        }

    }

}



    module.exports =new AuthController();