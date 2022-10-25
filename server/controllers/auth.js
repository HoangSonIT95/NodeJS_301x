const User = require('../models/User.js');

exports.postLogin = async (req, res, next) => {
  await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then(user => {
      req.session.userId = user._id;
      res.cookie('loggedIn', true).status(200).json('login success');
    })
    .catch(err => res.status(404).json('Wrong username or password!'));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.cookie('loggedIn', false).status(200).json('Logout success!');
  });
};
