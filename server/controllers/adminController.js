const Product = require('../models/productsModel');

class AdminController {
  getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.send(products);
    });
  };

  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(
      req.body.title,
      req.body.imgUrl,
      req.body.description,
      req.body.price
    );
    product.save();
    res.redirect('/');
  };

  getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
      res.send(product);
    });
  };
}

module.exports = new AdminController();
