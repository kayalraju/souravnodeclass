const express = require('express');
const HomeController = require('../controller/HomeController');
const studentImageUpload = require('../helper/studentImage');
const router=express.Router()



router.get('/',HomeController.homepge)

router.get('/list',HomeController.list)
router.get('/add',HomeController.addForm)
router.post('/create',studentImageUpload.single('image'),HomeController.createStudent)
//crud


module.exports = router