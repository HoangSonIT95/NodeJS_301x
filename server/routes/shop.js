const path = require('path');

const express = require('express');

const productController = require('../controllers/productsController');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/', productController.getProducts);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
module.exports = router;
