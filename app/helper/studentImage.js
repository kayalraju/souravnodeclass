const multer=require('multer');
const path=require('path');
const fs=require('fs');

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg'
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const isValid=FILE_TYPE_MAP[file.mimetype];
       let uploadError=new Error('Invalid image type');
       if(isValid){
        uploadError=null
       }
       cb(uploadError,'uploads')
    },
    filename:function(req,file,cb){
       const filename= file.originalname.split('').join('_')
       const extention=FILE_TYPE_MAP[file.mimetype]
       cb(null,`${filename}-${Date.now()}.${extention}`)
    }
})

const studentImageUpload=multer({storage:storage})

module.exports=studentImageUpload;