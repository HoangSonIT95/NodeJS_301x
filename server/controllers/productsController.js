const Product = require('../models/productsModel');

class ProductController {
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
}

module.exports = new ProductController();
