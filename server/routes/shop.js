const express = require('express');

const adminController = require('../controllers/adminController');
const shopController = require('../controllers/shopController');
const router = express.Router();

router.get('/', adminController.getProducts);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);
module.exports = router;
