const User = require('src/domain/User');
const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ models }) {
    super(models.UserModel, User);
  }
}

module.exports = UserRepository;
