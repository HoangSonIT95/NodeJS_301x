const path = require('path');

const express = require('express');

const adminController = require('../controllers/adminController');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/', adminController.getProducts);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
module.exports = router;
