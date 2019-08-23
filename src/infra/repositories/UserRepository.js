const User = require('src/domain/User');
const BaseRepository = require('./BaseRepository');

class UserRepository extends BaseRepository {
  constructor({ database }) {
    super(database.models.UserModel, User);
  }
}

module.exports = UserRepository;
