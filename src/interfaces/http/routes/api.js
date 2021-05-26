const { Router } = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const Status = require('http-status');

module.exports = () => {
  const router = new Router();

  // Router configuration
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(compression());

  // Routes
  router.get('/', (req, res) =>
    res.status(Status.OK).json({
      message: 'NodeJS DDD Boilerplate API Endpoint v1.2.0',
    })
  );

  return router;
};
