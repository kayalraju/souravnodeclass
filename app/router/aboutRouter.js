const express = require('express');
const AboutController = require('../controller/AboutController');

const router=express.Router()



router.get('/about',AboutController.about)


module.exports = router