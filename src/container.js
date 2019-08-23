const { asClass, asValue, asFunction, createContainer, Lifetime, listModules } = require('awilix');

// dependencies
const app = require('./app');
const config = require('./../config');

// infrastructures
const database = require('./infra/database');
const logger = require('./infra/logging/logger');
// const repository = require('./infra/repositories');

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

// load app modules
// will load up the the contents of the following:
// - app/*
// - infra/repositories/*
container.loadModules(['app/**/*.js', 'infra/repositories/*!(BaseRepository).js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
  cwd: __dirname,
});

container.cradle.createUser.execute({});

module.exports = container;
