const Product = require('../models/productsModel');
class AdminController {
  getProducts = (req, res, next) => {
    Product.fetchAll()
      .then(products => {
        res.send(products);
      })
      .catch(err => console.log(err));
  };

  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    console.log(req.user._id);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(
      title,
      price,
      imageUrl,
      description,
      null,
      req.user._id
    );
    product
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.send(product);
      })
      .catch(err => console.log(err));
  };

  postEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const product = new Product(
      updatedTitle,
      updatedPrice,
      updatedImageUrl,
      updatedDesc,
      prodId
    );
    product
      .save()
      .then(result => {
        res.send(result);
      })
      .catch(err => console.log(err));
  };

  postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.deleteById(prodId)
      .then(result => {
        res.json(result);
      })
      .catch(err => console.log(err));
  };
}
module.exports = new AdminController();
