const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const listUser = ['User 1', 'User 2'];

app.post('/', (req, res) => {
  console.log(req.body);
  listUser.push(req.body.user);
  res.redirect('http://localhost:3000/users');
});

app.get('/users', (req, res) => {
  res.send(listUser);
});

app.listen(5000);
