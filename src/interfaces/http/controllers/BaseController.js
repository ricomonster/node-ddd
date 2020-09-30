// Dependencies
const { Router } = require('express');

// Container
const container = require('src/container');

class BaseController {
  constructor() {
    this.router = new Router();
    this.container = container.cradle;
  }
}

module.exports = BaseController;
