class CreateUser {
  constructor({ logger, userRepository }) {
    this.logger = logger;
    this.userRepository = userRepository;
  }

  async execute(data) {
    this.logger.info(data);
    const user = await this.userRepository.create(data);
    this.logger.info(user);
  }
}

module.exports = CreateUser;
