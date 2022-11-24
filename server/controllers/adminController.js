const Product = require('../models/productsModel');

class AdminController {
  getProducts = (req, res, next) => {
    Product.findAll()
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
    Product.create({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
      .then(result => res.send(result))
      .catch(err => console.log(err));
  };

  getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    // Product.findAll({ where: { id: productId } })
    //   .then(products => {
    //     res.send(products[0]);
    //   })
    //   .catch(err => console.log(err));
    Product.findByPk(productId)
      .then(product => {
        res.send(product);
      })
      .catch(err => console.log(err));
  };

  postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.id)
      .then(product => {
        (product.title = req.body.title),
          (product.price = req.body.price),
          (product.description = req.body.description),
          (product.imageUrl = req.body.imageUrl);
        return product.save();
      })
      .then(result => {
        res.send(result);
      })
      .catch(err => console.log(err));
  };
}

module.exports = new AdminController();
