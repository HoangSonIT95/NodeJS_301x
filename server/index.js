const express = require('express');
const cors = require('cors');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./utils/db');

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

sequelize
  .sync()
  .then(result => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
