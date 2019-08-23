const User = require('src/domain/User');
const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ UserModel }) {
    super(UserModel, User);
  }
}

module.exports = UserRepository;
