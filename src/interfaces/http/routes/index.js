const { Router } = require('express');
const morgan = require('morgan');

// routes
const api = require('./api');

const routes = () => {
  // Initialize router
  const router = new Router();

  // Log the endpoints being accessed
  router.use(morgan('dev'));

  // Load up the routes
  router.use('/api', api());

  // Show available endpoints in the terminal

  return router;
};

module.exports = routes;
