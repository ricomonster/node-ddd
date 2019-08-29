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
  router.use(bodyParser.json());

  // START: API Routes
  // Example: router.use('/users', 'path of controller');
  // router.use('/', require('./controllers/users'));
  // router.get('/', (req, res) => {
  //   return res.send('Hello world.');
  // });
  router.use('/', controller('UserController'));
  // END: API Routes

  return router;
};

module.exports = Router;
