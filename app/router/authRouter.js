const express = require('express');
const AuthController = require('../controller/AuthController');
const { AuthCheck } = require('../middleware/Auth');
const router = express.Router();


router.post('/register',AuthController.register);
router.post('/login',AuthController.login);

router.all('/*',AuthCheck)
router.get('/dashboard',AuthController.dashboard);
router.get('/profile',AuthController.profile);





module.exports = router;