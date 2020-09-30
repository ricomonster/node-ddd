// Dependencies
const { Router } = require('express');

// Container
const container = require('src/container');

class BaseController {
  constructor() {
    this.router = new Router();
    this.container = container.cradle;

    // Dynamically inject operation based on operation request parameter
    this.injector = (operation) => (req, res, next) => {
      req['operation'] = operation;
      next();
    };
  }
}

module.exports = BaseController;
