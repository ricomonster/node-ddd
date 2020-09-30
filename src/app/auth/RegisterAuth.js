// Domain
const Register = require('src/domain/auth/Register');
const User = require('src/domain/User');

class RegisterAuth {
  constructor({ encryption, userRepository }) {
    this.encryption = encryption;
    this.userRepository = userRepository;
  }

  async execute(args) {
    // Validate
    const registerData = new Register(args);
    const { valid, errors } = registerData.validate(args);

    if (!valid) {
      const error = new Error('Validation failed!');
      error.errors = errors;
      throw error;
    }

    // Find the user
    const existing = await this.userRepository.find('email', args.email);
    if (existing) {
      const error = new Error('Email already exists.');
      error.errors = [{ message: 'Email already exists.', path: ['email'] }];
      throw error;
    }

    try {
      // Prepare data
      const data = {
        ...args,
        password: this.encryption.encrypt(args.password),
      };

      // Create user
      const newUser = await this.userRepository.create(data);

      // Remove password and wrap to a domain
      delete newUser.dataValues.password;
      const domainUser = new User(newUser.dataValues);

      return domainUser.toJSON();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RegisterAuth;
