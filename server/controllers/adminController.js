const Product = require('../models/productsModel');

class AdminController {
  getProducts = (req, res, next) => {
    Product.findAll()
      .then(products => {
        res.send(products);
      })
      .catch(err => console.log(err));
  };

  getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
    });
  };

  postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
      .then(result => {
        // console.log(result);
        console.log('Created Product');
      })
      .catch(err => {
        console.log(err);
      });
  };

  getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
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
    Product.findByPk(prodId)
      .then(product => {
        console.log(product);
        product.title = updatedTitle;
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl;
        product.description = updatedDesc;
        return product.save();
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => console.log(err));
  };

  postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
  };
}
module.exports = new AdminController();
