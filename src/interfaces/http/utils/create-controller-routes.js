// dependencies
const path = require('path');

const CreateControllerRoutes = uri => {
  const controllerPath = path.resolve('src/interfaces/http/controllers', uri);
  const ControllerInstance = require(`${controllerPath}`);
  const Controller = new ControllerInstance();

  if (typeof Controller.routes !== 'function') {
    throw new Error('Controller does not have routes.');
  }

  return Controller.routes();
};

module.exports = CreateControllerRoutes;
