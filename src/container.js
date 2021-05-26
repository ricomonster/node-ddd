const { createContainer, Lifetime, asClass, asValue } = require('awilix');

// Config
const config = require('../config');

// Interfaces
const HTTPServer = require('./interfaces/http/Server');

// Create container
const container = createContainer();

// Register Defaults
container.register({
  config: asValue(config),

  httpServer: asClass(HTTPServer),
});

// Dynamic registration to the container
container.loadModules(
  [
    // 'app/**/*.js',
    // 'infra/authentication/*.js',
    // 'infra/encryption/*.js',
    // 'infra/repositories/*!(BaseRepository).js',
    'infrastructures/*/*!(index).js',
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON,
    },
    cwd: __dirname,
  }
);

// Let's show what are the registered components if APP_DEBUG is enabled.
if (config.app.debug) {
  const { log } = console;
  log(container.registrations);
}

module.exports = container;
