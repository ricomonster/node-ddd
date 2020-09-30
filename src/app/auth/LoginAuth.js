// Domain
const Login = require('src/domain/auth/Login');

// Operation
const Operation = require('src/app/Operation');

class LoginAuth extends Operation {
  constructor({ userRepository }) {
    super();

    this.userRepository = userRepository;
  }

  async execute(args) {
    // Get the events
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.events;

    // Validate
    const loginData = new Login(args);
    const { valid, errors } = loginData.validate(args);

    if (!valid) {
      return this.emit(VALIDATION_ERROR, { errors });
    }

    // Find the user
    const existing = await this.userRepository.find('email', args.email);
    if (!existing) {
      return this.emit(NOT_FOUND, { message: 'Email does not exists.' });
    }

    try {
    } catch (error) {
      console.log(error);
    }
  }
}

LoginAuth.setEvents(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = LoginAuth;
