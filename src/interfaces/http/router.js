const bodyParser = require('body-parser');
const express = require('express');

const Router = ({}) => {
  const apiRouter = express.Router();

  // router configuration
  apiRouter.use(bodyParser.json());

  // START: API Routes
  // Example: apiRouter.use('/users', 'path of controller');
  apiRouter.use('/', (req, res) => {
    return res.send('Hello world');
  });
  // END: API Routes

  return apiRouter;
};

module.exports = Router;
