const { createContainer, Lifetime } = require('awilix');

const container = createContainer();

// Dynamically register app, infra components
container.loadModules(['app/**/*!(index).js', 'infra/**/*!(index).js'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
  },
  cwd: __dirname,
});

// console.log(container.registrations);

module.exports = container;
