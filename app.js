const express = require('express'); // import express

const app = express();

app.use('/users', (req, res, next) => {
  res.send('<p>The Middleware that handles just /users</p>');
});

app.use('/', (req, res, next) => {
  res.send('<p>The Middleware that handles just /</p>');
});

app.listen(3000);
