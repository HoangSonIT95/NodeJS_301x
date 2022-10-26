const express = require('express');
const { validateLogin, validateSignup } = require('./../middlewares/validate');
const { check, body } = require('express-validator');

const router = express.Router();
const authController = require('../controllers/auth');
const User = require('../models/User');

router.post('/login', validateLogin, authController.postLogin);

router.post('/register', validateSignup, authController.postRegister);

router.post('/logout', authController.postLogout);

module.exports = router;
