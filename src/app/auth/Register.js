// dependencies
const Validator = require('Validator');

// domain
const User = require('src/domain/User');

class Register {
  constructor({ encryption, userRepository, validator }) {
    this.encryption = encryption;
    this.userRepository = userRepository;
    this.validator = validator;
  }

  async execute(data) {
    // validate
    const validation = this.validate(data);

    if (validation.fails()) {
      const error = new Error('Validation failed!');
      error.errors = validation.getErrors();
      error.statusCode = 400;
      throw error;
    }

    // check if the email already exists
    const existing = await this.userRepository.findByField('email', data.email);

    if (existing) {
      // throw an error
      const error = new Error('Email already exists.');
      error.errors = {
        email: ['Email already exists.'],
      };
      error.statusCode = 400;
      throw error;
    }

    // set the user domain
    const userData = new User({
      ...data,
      password: this.encryption.encrypt(data.password),
    });

    // create it
    const user = await this.userRepository.create(userData);

    // make sure to not send the password
    delete user.dataValues.password;

    // return the newly created data
    return user;
  }

  validate(data) {
    return this.validator.make(data, {
      email: ['required', 'email'],
      password: ['required', 'min:8'],
    });
  }
}

module.exports = Register;
