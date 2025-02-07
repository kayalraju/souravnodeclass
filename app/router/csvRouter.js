const express = require('express'); 
const router=express.Router();
const bodtyParser = require('body-parser');
const multer = require('multer');
const path=require('path');
const CsvController = require('../controller/CsvController');
router.use(bodtyParser.json({limit:'50mb'}));
router.use(bodtyParser.urlencoded({limit:"100mb",extended:true}));
router.use(express.static('public'))

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/csvUpload'))
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage:storage})

router.post('/create/csv',upload.single('file'),CsvController.creatCSv)


module.exports=router;