const { createContainer, asValue, asFunction } = require('awilix');

// dependencies
const app = require('./app');
const config = require('./../config');

// infrastructures
const database = require('./infrastructures/database');
const logger = require('./infrastructures/logging/logger');

// interfaces
const router = require('./interfaces/http/router');
const server = require('./interfaces/http/server');

// instantiate the container
const container = createContainer();

// build out the system
container.register({
  app: asFunction(app).singleton(),
  config: asValue(config),

  // infrastructures
  database: asFunction(database).singleton(),
  logger: asFunction(logger).singleton(),

  // interfaces
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
});

module.exports = container;
