const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const db = require('./db');
const { models: { Product, Company, Offering }, sync } = require('./db');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/products', async (req, res, next) => {
  try {
    res.send(await Product.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/companies', async (req, res, next) => {
  try {
    res.send(await Company.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

app.get('/api/offerings', async (req, res, next) => {
  try {
    res.send(await Offering.findAll());
  }
  catch(ex) {
    next(ex);
  }
});

sync()
  .then(() => {
      app.listen(port, () => console.log(`listening on port ${port}`));
  })
