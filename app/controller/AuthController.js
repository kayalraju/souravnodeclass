const sendEmailVerificationOTP = require('../helper/sendEmailVerificationOtp');
const { hashPassword, comparePassword } = require('../middleware/Auth');
const User=require('../model/user')
const jwt = require('jsonwebtoken');
const EmailVerifyModel=require('../model/emailVerify')

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
      sendEmailVerificationOTP(req,user)
      res.status(201).json({
        message:'User created successfully and send otp to your email',
        data:user
      })

    }catch(error){
        console.log(error);
        
    }

}

     /**verify otp */
     async verifyOtp(req,res){
        try {
            const { email, otp } = req.body;
            // Check if all required fields are provided
            if (!email || !otp) {
                return res.status(400).json({ status: false, message: "All fields are required" });
            }
            const existingUser = await User.findOne({ email });

            // Check if email doesn't exists
            if (!existingUser) {
                return res.status(404).json({ status: "failed", message: "Email doesn't exists" });
            }

            // Check if email is already verified
            if (existingUser.is_verified) {
                return res.status(400).json({ status: false, message: "Email is already verified" });
            }
            // Check if there is a matching email verification OTP
            const emailVerification = await EmailVerifyModel.findOne({ userId: existingUser._id, otp });
            if (!emailVerification) {
                if (!existingUser.is_verified) {
                    // console.log(existingUser);
                    await sendEmailVerificationOTP(req, existingUser);
                    return res.status(400).json({ status: false, message: "Invalid OTP, new OTP sent to your email" });
                }
                return res.status(400).json({ status: false, message: "Invalid OTP" });
            }
            // Check if OTP is expired
            const currentTime = new Date();
            // 15 * 60 * 1000 calculates the expiration period in milliseconds(15 minutes).
            const expirationTime = new Date(emailVerification.createdAt.getTime() + 15 * 60 * 1000);
            if (currentTime > expirationTime) {
                // OTP expired, send new OTP
                await sendEmailVerificationOTP(req, existingUser);
                return res.status(400).json({ status: "failed", message: "OTP expired, new OTP sent to your email" });
            }
            // OTP is valid and not expired, mark email as verified
            existingUser.is_verified = true;
            await existingUser.save();

            // Delete email verification document
            await EmailVerifyModel.deleteMany({ userId: existingUser._id });
            return res.status(200).json({ status: true, message: "Email verified successfully" });


        } catch (error) {
            console.error(error);
            res.status(500).json({ status: false, message: "Unable to verify email, please try again later" });
        }

    }



    /***login user */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            User.validate(email, password)
            if (!email || !password) {
                return res.status(400).json({
                    message: 'All fields are required'
                });
            }
            const user = await User.findOne({ email });
            //console.log('user',user);   

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }
            // Check if user verified
            if (!user.is_verified) {
                return res.status(401).json({ status: false, message: "Your account is not verified" });
            }
            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Invalid credentials'
                });
            }
            const token = jwt.sign({
                _id: user._id,
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRECT_KEY, { expiresIn: "2h" })

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (err) {
            console.log(err);
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