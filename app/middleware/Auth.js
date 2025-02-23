const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const hashPassword=(password)=>{
    try{
        const salt=10;
        const hashedPassword=bcrypt.hashSync(password,salt);
        return hashedPassword;
    }catch(err){
        console.log(err);
        
    }
}
const comparePassword=(password,hashedPassword)=>{
    try{
        const isMatch=bcrypt.compareSync(password,hashedPassword);
        return isMatch;
    }catch(err){
        console.log(err);

    }
}

const AuthCheck=async(req,res,next)=>{
    const token=req.body.token || req.query.token||req.headers['x-access-token']
    if(!token){
        return res.status(403).json({
            message:'Access denied'
        })
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRECT_KEY);
        req.user=decode;
    }
    catch(err){
        return res.status(401).json({
            message:'Invalid Token'
        })
    }
    return next();

}




module.exports={hashPassword,comparePassword,AuthCheck};
