const fs = require('fs');
const path = require('path');

const Product = require('../models/Product.js');
const Order = require('../models/Order.js');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.send(product);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.getCart = async (req, res, next) => {
  await req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.status(200).json(products);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.postOrder = async (req, res, next) => {
  await req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: { email: req.user.email, userId: req.user },
        products: products,
      });
      return order.save();
    })

    .then(result => {
      req.user.clearCart();
      res.send(result);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      error.message = err.message;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then(order => {
      if (!order) {
        const error = new Error();
        error.httpStatusCode = 404;
        error.message = 'No order found.';
        return next(error);
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        const error = new Error();
        error.httpStatusCode = 401;
        error.message = 'Unauthorized';
        return next(error);
      }

      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);

      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     const error = new Error(err);
      //     error.httpStatusCode = 500;
      //     error.message = err.message;
      //     return next(error);
      //   }
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader(
      //     'Content-Disposition',
      //     'attachment; filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });

      const file = fs.createReadStream(invoicePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="' + invoiceName + '"'
      );
      file.pipe(res);
    })
    .catch(err => next(err));
};
