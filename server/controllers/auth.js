const User = require('../models/User.js');

exports.postLogin = async (req, res, next) => {
  await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then(user => {
      req.session.userId = user._id;
      res.cookie('userId', user._id).status(200).json({
        userId: user._id,
      });
    })
    .catch(err => res.status(404).json('Wrong username or password'));
};

exports.postLogout = async (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
