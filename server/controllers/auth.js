const User = require('../models/User.js');
const Cookies = require('universal-cookie');

exports.postLogin = async (req, res, next) => {
  await User.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then(user => {
      req.session.userId = user._id;
      res.status(200).json({
        cookieUser: req.session,
      });
    })
    .catch(err => res.status(404));
};

// const cookies = new Cookies(req.headers.cookie);
// console.log(cookies.get('connect.sid'));

exports.postLogout = async (req, res, next) => {
  console.log(req.headers.cookie);
  await req.session.destroy(err => {
    // console.log(err);
    // res.redirect('/');
    res.status(200).json('Logout success!');
  });
};
