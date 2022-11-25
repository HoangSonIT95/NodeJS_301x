const express = require('express');
const cors = require('cors');
const app = express();

// const mongoConnect = require('./utils/db').mongoConnect;
const mongoose = require('mongoose');
const User = require('./models/userModel');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  User.findById('6380623d0473d9dcdefbaea8')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoose
  .connect(
    'mongodb+srv://hoangson:Thanhnien123@cluster0.bnu0sln.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(5000);
  })
  .catch(err => console.log(err));
