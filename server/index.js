const express = require('express');
const cors = require('cors');
const app = express();

const mongoConnect = require('./utils/db').mongoConnect;
const User = require('./models/userModel');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findById('635946707760665c8e12151c')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoConnect(() => {
  app.listen(5000);
});
