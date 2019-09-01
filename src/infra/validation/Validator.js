// dependencies
const validator = require('Validator');

class Validator {
  constructor() {
    this.validator = validator;
  }

  make(data, rules) {
    return this.validator.make(data, rules);
  }
}

module.exports = Validator;
