const express = require('express');
const cors = require('cors');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./utils/db');
const Product = require('./models/productsModel');
const User = require('./models/userModel');
const Cart = require('./models/cartModel');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' }); // 1 product chỉ có 1 user, thêm PK vào Product
User.hasMany(Product); // 1 user  có nhiều product
User.hasOne(Cart); // 1 user có 1 cart, thêm PK vào bảng Cart
Cart.belongsTo(User); // 1 cart có 1 user, thêm PK vào bảng Cart
Cart.belongsToMany(Product, { through: CartItem }); // 1 cart có nhiều product, liên kết với nhau tại bảng CartItem
Product.belongsToMany(Cart, { through: CartItem }); // 1 product có thể ở nhiều cart, liên kết với nhau tại bảng CartItem
Order.belongsTo(User); // 1 order chỉ có 1 user
User.hasMany(Order); // 1 user có thể có nhiều order
Order.belongsToMany(Product, { through: OrderItem }); // 1 order có thể có nhiều product và 1 product có thể nằm trong nhiều order, liên kết với nhau tại bảng OrderItem

sequelize
  .sync({ force: true })
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => app.listen(5000))
  .catch(err => {
    console.log(err);
  });
