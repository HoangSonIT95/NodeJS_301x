const express = require('express');
const multer = require('multer');
const fileUploader = require('../configs/cloudinary.config');
const router = express.Router();

const adminController = require('../controllers/admin');
const auth = require('../middlewares/auth');
const { validateProduct } = require('../middlewares/validate');

// /admin/add-product => GET
router.get('/add-product', auth.authLogin, adminController.getAddProduct);

// // /admin/products => GET
router.get('/products', auth.authLogin, adminController.getProducts);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');
  },
  filename: function (req, file, cb) {
    cb(null, 'test-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'image'
);

// // /admin/add-product => POST
router.post(
  '/add-product',
  auth.authLogin,
  fileUploader.single('image'),
  validateProduct,
  adminController.postAddProduct
);

router.get(
  '/edit-product/:productId',
  auth.authLogin,
  adminController.getEditProduct
);

router.post(
  '/edit-product/:productId',
  auth.authLogin,
  validateProduct,
  adminController.postEditProduct
);

router.post(
  '/delete-product',
  auth.authLogin,
  adminController.postDeleteProduct
);

module.exports = router;
