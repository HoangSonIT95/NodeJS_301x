const Product = require('../models/productsModel');

class AdminController {
  getProducts = (req, res, next) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        res.send(rows);
      })
      .catch(err => console.log(err));
  };

  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    const product = new Product(
      null,
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

  postEditProduct = (req, res, next) => {
    const updatedProduct = new Product(
      req.body.id,
      req.body.title,
      req.body.imageUrl,
      req.body.price,
      req.body.description
    );
    updatedProduct.save();
    res.redirect('/admin/products');
  };
}

module.exports = new AdminController();
