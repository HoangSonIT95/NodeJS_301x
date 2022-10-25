const Product = require('../models/Product.js');
class AdminController {
  getProducts = (req, res, next) => {
    Product.find()
      // .select('title price -_id')
      // .populate('userId', 'name')
      .then(products => {
        res.send(products);
      })
      .catch(err => console.log(err));
  };
  getAddProduct = (req, res, next) => {};

  postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user;
    const product = new Product({
      title,
      price,
      imageUrl,
      description,
      userId,
    });
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
    Product.findById(prodId)
      .then(product => {
        (product.title = updatedTitle),
          (product.price = updatedPrice),
          (product.imageUrl = updatedImageUrl),
          (product.description = updatedDesc);
        return product.save();
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => console.log(err));
  };

  postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findByIdAndRemove(prodId)
      .then(result => {
        res.json(result);
      })
      .catch(err => console.log(err));
  };
}
module.exports = new AdminController();
