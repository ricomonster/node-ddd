class CreateUser {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute(data) {
    console.log('d', data);
    console.log('tt', this.userRepository.create(data));
  }
}

module.exports = CreateUser;
