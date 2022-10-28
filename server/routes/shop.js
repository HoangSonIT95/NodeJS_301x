const express = require('express');

const shopController = require('../controllers/shop');
const auth = require('../middlewares/auth');
const router = express.Router();

module.exports = router;

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', auth.authLogin, shopController.getCart);

router.post('/cart', auth.authLogin, shopController.postCart);

router.post(
  '/cart-delete-item',
  auth.authLogin,
  shopController.postCartDeleteProduct
);

router.get('/orders', auth.authLogin, shopController.getOrders);
router.get('/orders/:orderId', auth.authLogin, shopController.getInvoice);
router.post('/create-order', auth.authLogin, shopController.postOrder);

// router.get('/checkout', shopController.getCheckout);
