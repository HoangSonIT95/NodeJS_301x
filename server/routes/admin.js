const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const auth = require('../middlewares/auth');

// /admin/add-product => GET
router.get('/add-product', auth.authLogin, adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', auth.authLogin, adminController.getProducts);

// // /admin/add-product => POST
router.post('/add-product', auth.authLogin, adminController.postAddProduct);

router.get(
  '/edit-product/:productId',
  auth.authLogin,
  adminController.getEditProduct
);

router.post(
  '/edit-product/:productId',
  auth.authLogin,
  adminController.postEditProduct
);

router.post(
  '/delete-product',
  auth.authLogin,
  adminController.postDeleteProduct
);

module.exports = router;
