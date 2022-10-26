const Product = require('../models/Product.js');
const { validationResult } = require('express-validator');

class AdminController {
  getProducts = (req, res, next) => {
    Product.find({ userId: req.user._id })
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array()[0].msg);
    }
    
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
        if(product.userId !== req.user._id){
          return res.status(500).json('You are not authorization')
        }
        (product.title = updatedTitle);
          (product.price = updatedPrice);
          (product.imageUrl = updatedImageUrl);
          (product.description = updatedDesc);
        return product.save().then(result => {
          res.send(result);
        });
      })
      
      .catch(err => console.log(err));
  };

  postDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.deleteOne({_id: prodId, userId: req.user._id})
      .then(result => {
        res.json(result);
      })
      .catch(err => console.log(err));
  };
}
module.exports = new AdminController();
