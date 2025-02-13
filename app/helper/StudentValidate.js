
studentValidate=(validator)=>{
    return(req,res,next)=>{
        const {error}=validator(req.body);
        if(error){
            return res.status(400).json({
                message:error.message
            })
        }
        next();
    }
}

module.exports={studentValidate}