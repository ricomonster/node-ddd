// Dependencies
const { Router } = require('express');

// Container
const container = require('src/container');

class BaseController {
  constructor() {
    this.router = new Router();
  }
}

module.exports = BaseController;
