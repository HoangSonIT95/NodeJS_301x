const express = require('express');
const cors = require('cors');
const app = express();

const listUser = [];

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.get('/users', (req, res) => {
  res.send(listUser);
});

app.post('/', (req, res) => {
  listUser.push(req.body.user);
  res.redirect('/users');
});

app.listen(5000);
