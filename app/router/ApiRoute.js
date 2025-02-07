const express = require('express'); 
const ApiController = require('../controller/ApiController');
const studentImageUpload = require('../helper/studentImage');
const router=express.Router();



router.post('/create/student',studentImageUpload.single('image'), ApiController.createStudent)
router.get('/student', ApiController.getstudent)
router.get('/student/:id', ApiController.editstudent)
router.post('/student/update/:id', ApiController.updatetudent)
router.delete('/student/delete/:id', ApiController.deletestudent)


//multiple image upload
router.post('/create/multi/image',studentImageUpload.array('images',10), ApiController.multipleImage)


module.exports=router;