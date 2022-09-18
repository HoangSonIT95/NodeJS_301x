const Product = require('../models/productsModel');
const Cart = require('../models/cartModel');

class ShopController {
  getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        for (product of products) {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts,
        });
      });
    });
  };

  postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
    res.json(req.body);
  };
}

module.exports = new ShopController();
