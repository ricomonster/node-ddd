const { Router } = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

// Utils
const createController = require('src/interfaces/http/utils/create-controller');

module.exports = () => {
  const router = new Router();

  // Router configuration
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(compression());

  // Routes
  router.post('/auth/login', createController('AuthController').login);
  router.post('/auth/register', createController('AuthController').register);

  return router;
};
