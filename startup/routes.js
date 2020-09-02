// const cors = require('cors');
const express = require('express');

const auth = require('../routes/auth');
const home = require('../routes/home');
const users = require('../routes/users');
const products = require('../routes/product');
const contactus = require('../routes/contactus');

const error = require('../middleware/error');

module.exports = function (app) {
  // app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  app.use('/', home);
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/listings', products);
  app.use('/api/messages', contactus);

  app.use(error)
}
