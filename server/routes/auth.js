const express = require('express');
const { validateLogin, validateSignup } = require('./../middlewares/validate');

const router = express.Router();
const authController = require('../controllers/auth');

router.post('/login', validateLogin, authController.postLogin);

router.post('/register', validateSignup, authController.postRegister);

router.post('/logout', authController.postLogout);

module.exports = router;
