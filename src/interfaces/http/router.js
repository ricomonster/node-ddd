// dependencies
const bodyParser = require('body-parser');
const express = require('express');
const statusMonitor = require('express-status-monitor');

const controller = require('./utils/create-controller-routes');

const Router = ({ config }) => {
  const router = express.Router();

  // status monitor for development
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  // router configuration
  router.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // START: API Routes
  // router.use('/', controller('UserController'));
  router.use('/auth', controller('AuthController'));
  // END: API Routes

  return router;
};

module.exports = Router;
