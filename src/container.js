const { createContainer, asValue, asFunction } = require('awilix');

// dependencies
const app = require('./app');
const router = require('./interfaces/http/router');
const server = require('./interfaces/http/server');

// instantiate the container
const container = createContainer();

// build out the system
container.register({
  app: asFunction(app).singleton(),
  router: asFunction(router).singleton(),
  server: asFunction(server).singleton(),
});

module.exports = container;
