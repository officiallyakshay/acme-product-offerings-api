const express = require('express');
const path = require('path');
const db = require('./db');
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', (req, res, next) => {

});

app.get('/api/companies', (req, res, next) => {

});

app.get('/api/offerings', (req, res, next) => {

});

db.sync()
  .then(() => {
      app.listen(port, () => console.log(`listening on port ${port}`));
  })