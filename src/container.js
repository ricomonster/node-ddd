const { createContainer, asValue, asFunction } = require('awilix');

// dependencies
const app = require('./app');

// infrastructures
const logger = require('./infrastructures/logging/logger');

// interfaces
const router = require('./interfaces/http/router');
const server = require('./interfaces/http/server');

// instantiate the container
const container = createContainer();

// build out the system
container.register({
  app: asFunction(app).singleton(),

  // infrastructures
  logger: asFunction(logger).singleton(),

  // interfaces
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
});

module.exports = container;
