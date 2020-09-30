const { createContainer, Lifetime, asClass, asValue } = require('awilix');

// Configuration
const config = require('./../config');

// Infra
const models = require('./infra/models');

// Interfaces
const Server = require('./interfaces/http/Server');

// Start creating the container
const container = createContainer();

// Register manually
container.register({
  config: asValue(config),
  models: asValue(models),

  server: asClass(Server).singleton(),
});

// Dynamically register app, infra components
container.loadModules(
  ['app/**/*.js', 'infra/encryption/*.js', 'infra/repositories/*!(BaseRepository).js'],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
    cwd: __dirname,
  }
);

console.log(container.registrations);

module.exports = container;
