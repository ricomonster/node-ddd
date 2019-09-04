// dependencies
const bodyParser = require('body-parser');
const express = require('express');
const statusMonitor = require('express-status-monitor');
const morgan = require('morgan');

const controller = require('./utils/create-controller-routes');

const Router = container => {
  const { config } = container;

  const router = express.Router();

  // status monitor for development
  if (config.env === 'development') {
    router.use(statusMonitor());
    router.use(morgan('dev'));
  }

  // router configuration
  router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // START: API Routes
  router.get('/', (req, res) => {
    return res.render('index');
  });
  router.use('/auth', controller('AuthController'));
  // END: API Routes

  return router;
};

module.exports = Router;
