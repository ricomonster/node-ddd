// Domain
const Login = require('src/domain/auth/Login');

class LoginAuth {
  constructor({ config, authRepository, userRepository }) {
    this.config = config;
    this.authRepository = authRepository;
    this.userRepository = userRepository;
  }

  async execute(args) {
    // Validate
    const loginData = new Login(args);
    const { valid, errors } = loginData.validate(args);

    if (!valid) {
      const error = new Error('Validation failed!');
      error.errors = errors;
      throw error;
    }

    // Find the user
    const existing = await this.userRepository.find('email', args.email);
    if (!existing) {
      const error = new Error('Invalid account credentials.');
      throw error;
    }

    // Validate the password
    const { dataValues: user } = existing;
    if (!this.authRepository.verifyPassword(args.password, user.password)) {
      const error = new Error('Invalid account credentials.');
      throw error;
    }

    // Generate the token for logging in
    try {
      // Setup the data to be encoded
      const info = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      // Generate token
      const token = this.authRepository.generateToken(
        info,
        this.config.jwt.secret,
        this.config.jwt.ttl
      );

      return {
        user: info,
        token,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoginAuth;
