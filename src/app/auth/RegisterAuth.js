// Domain
const Register = require('src/domain/auth/Register');
const User = require('src/domain/User');

// Operation
const Operation = require('src/app/Operation');

class RegisterAuth extends Operation {
  constructor({ encryption, userRepository }) {
    super();

    this.encryption = encryption;
    this.userRepository = userRepository;
  }

  async execute(args) {
    // Get the events
    const { SUCCESS, VALIDATION_ERROR, ERROR } = this.events;

    // Validate
    const registerData = new Register(args);
    const { valid, errors } = registerData.validate(args);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, { errors });
    }

    // Find the user
    const existing = await this.userRepository.find('email', args.email);
    if (existing) {
      return this.emit(VALIDATION_ERROR, {
        errors: [{ message: 'Email already exists', path: ['email'] }],
      });
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

      this.emit(SUCCESS, domainUser.toJSON());
    } catch (error) {
      console.log(error);
    }
  }
}

RegisterAuth.setEvents(['SUCCESS', 'VALIDATION_ERROR', 'ERROR']);

module.exports = RegisterAuth;
