const { check, body } = require('express-validator');
const User = require('../models/User');

exports.validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      return User.findOne({
        email: value,
      }).then(user => {
        if (!user) {
          return Promise.reject(
            'Email exists already, please pick a different one.'
          );
        }
        req.user = user;
      });
    }),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  )
    .isLength({ min: 8 })
    .isAlphanumeric(),
];

exports.validateSignup = [
  check('email') // kiem tra email o bat ki dau (cookie, header, body...)
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
      return User.findOne({
        email: value,
      }).then(user => {
        if (user) {
          return Promise.reject(
            'Email exists already, please pick a different one.'
          );
        }
      });
    }),
  body(
    'password',
    'Please enter a password with only numbers and text and at least 5 characters.'
  ) // kiem tra password chi trong body
    .isLength({ min: 8 })
    .isAlphanumeric(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords have to match!');
    }
    return true;
  }),
];

exports.validateAddProduct = [
  body('title')
    .isString()
    .isLength({ min: 5 })
    .trim()
    .withMessage('Please enter a title with text and at least 5 characters.'),
  body('imageUrl').isURL().withMessage('Please enter a valid image URL.'),
  body('price')
    .isFloat()
    .withMessage('Please enter a price with float number.'),
  body('description')
    .isLength({ min: 5 })
    .trim()
    .withMessage(
      'Please enter a description with text and at least 5 characters. '
    ),
];
