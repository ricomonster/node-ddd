class AuthorizeAuth {
  constructor({ authRepository, userRepository }) {
    this.authRepository = authRepository;
    this.userRepository = userRepository;
  }

  async execute(token) {
    // Decode the token
    const decodedToken = this.authRepository.decodeToken(token);

    // Check if the token is already expired
    const currentTime = Math.round(Date.now() / 1000);
    if (currentTime > decodedToken.exp) {
      const error = new Error('Token expired.');
      throw error;
    }

    // Check if the user does exists
    const existing = await this.userRepository.find('email', decodedToken.email);
    if (!existing) {
      const error = new Error('Unauthorized access.');
      throw error;
    }

    // Remove the password
    delete existing.dataValues.password;

    return existing.dataValues;
  }
}

module.exports = AuthorizeAuth;
