const Product = require('../models/productsModel');
const Cart = require('../models/cartModel');

class ShopController {
  getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProducts = [];
        products.forEach(product => {
          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );
          if (cartProductData) {
            cartProducts.push({
              productData: product,
              qty: cartProductData.qty,
            });
          }
        });
        res.send(cartProducts);
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

  postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, product => {
      Cart.deleteProduct(productId, product.price);
      res.redirect('/cart');
    });
  };
}

module.exports = new ShopController();
