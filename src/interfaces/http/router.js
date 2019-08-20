const bodyParser = require('body-parser');
const express = require('express');

const controller = require('./utils/create-controller-routes');

const Router = ({}) => {
  const apiRouter = express.Router();

  // router configuration
  apiRouter.use(bodyParser.json());

  // START: API Routes
  // Example: apiRouter.use('/users', 'path of controller');
  apiRouter.use('/', require('./controllers/users'));
  // END: API Routes

  return apiRouter;
};

module.exports = Router;
