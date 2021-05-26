const { Router } = require('express');
const morgan = require('morgan');
const Status = require('http-status');

// Routes
const api = require('./api');

const routes = () => {
  // Initialize router
  const router = new Router();

  // Log the endpoints being accessed
  router.use(morgan('dev'));

  // Load up the routes
  router.use('/api', api());

  // Default route
  router.get('/', (req, res) => {
    res.status(Status.OK).json({
      message: 'NodeJS DDD Boilerplate v1.2.0',
    });
  });

  return router;
};

module.exports = routes;
