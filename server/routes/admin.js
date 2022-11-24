const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/products', adminController.getProducts);

router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product/:productId', adminController.postEditProduct);

router.delete('/delete/:id', adminController.postDeleteProduct);

module.exports = router;
