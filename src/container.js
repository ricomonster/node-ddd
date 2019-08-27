const { asClass, asValue, asFunction, createContainer, Lifetime } = require('awilix');

// dependencies
const Application = require('./app/Application');
const config = require('./../config');

// infrastructures
const database = require('./infra/database');
const logger = require('./infra/logging/logger');
// const repository = require('./infra/repositories');

// interfaces
// server setup
const router = require('./interfaces/http/router');
const Server = require('./interfaces/http/Server');

// graphql setup
const GraphQL = require('./interfaces/graphql/Server');

// instantiate the container
const container = createContainer();

// build out the system
container.register({
  app: asClass(Application).singleton(),
  config: asValue(config),

  // infrastructures
  database: asFunction(database).singleton(),
  logger: asFunction(logger).singleton(),

  // interfaces
  // server/rest api setup
  router: asFunction(router).singleton(),
  server: asClass(Server).singleton(),

  // graphql
  graphql: asClass(GraphQL).singleton(),
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

// container.cradle.createUser.execute({});

module.exports = container;
