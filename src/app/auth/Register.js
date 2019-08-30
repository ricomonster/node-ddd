// dependencies
const Validator = require('Validator');

// domain
const User = require('src/domain/User');

class Register {
  constructor({ encryption, userRepository }) {
    this.encryption = encryption;
    this.userRepository = userRepository;
  }

  async execute(data) {
    // validate
    const validation = await this.validate(data);

    if (validation.fails()) {
      const error = new Error('Validation failed!');
      error.errors = validation.getErrors();
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
    return Validator.make(data, {
      email: ['required', 'email'],
      password: ['required', 'min:8'],
    });
  }
}

module.exports = Register;
