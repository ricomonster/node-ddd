// dependencies
const { Router } = require('express');

// container
const container = require('src/container');

class BaseController {
  constructor() {
    this.router = new Router();
    this.operations = container.cradle;
  }
}

module.exports = BaseController;
