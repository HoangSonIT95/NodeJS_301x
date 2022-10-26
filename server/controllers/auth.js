const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

exports.postLogin = async (req, res, next) => {
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }
  
  await User.findOne({
    email: req.body.email,
  })
    .then(user => {
      if (!user) {
        res.status(404).json('Email not exists!');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.userId = user._id;
            return res
              .cookie('loggedIn', true)
              .status(200)
              .json('Login success!');
          }
          res.status(404).json('Wrong password!');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array()[0].msg);
  }
  // User.findOne({
  //   email: email,
  // })
  //   .then(user => {
  //     if (user) {
  //       return res.status(500).json('Email already exists!');
  //     }
  bcrypt
    .hash(password, 15)
    .then(hashedPassword => {
      const newUser = new User({
        email: email,
        password: hashedPassword,
        cart: {
          items: [],
        },
      });
      return newUser.save();
    })
    .then(result => {
      res.status(200).json('Register success!');
      transporter.sendMail({
        to: email,
        from: 'sonhvfx16039@funix.edu.vn',
        subject: 'Sign succeeded!',
        html: '<h1>You successfully signed up!</h1>',
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    res.cookie('loggedIn', false).status(200).json('Logout success!');
  });
};
