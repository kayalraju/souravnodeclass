const setrateLimit=require('express-rate-limit');



const rateLimit=setrateLimit({
    windowMs:1*60*1000, ///1 min
    max:5,
    message:"Too many request send please wait ",
    header:true,
})

module.exports=rateLimit;