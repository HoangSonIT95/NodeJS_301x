const Product = require('../models/Product.js');
const Order = require('../models/Order.js');
exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.send(product);
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.send(products);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  await req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items;
      res.status(200).json(products);
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.send(result);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id }).then(orders => {
    res.send(orders);
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
        user: { name: req.user.name, userId: req.user },
        products: products,
      });
      return order.save();
    })

    .then(result => {
      req.user.clearCart();
      res.send(result);
    })
    .catch(err => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout',
//   });
// };
