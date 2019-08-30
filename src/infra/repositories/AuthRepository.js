// repository
const BaseRepository = require('./BaseRepository');

/**
 * AuthRepository
 *
 * @class AuthRepository
 * @extends {BaseRepository}
 */
class AuthRepository extends BaseRepository {
  constructor({ jwt }) {
    super();
    this.jwt = jwt;
  }

  /**
   * Decodes the content of a token.
   *
   * @param {String} token
   * @returns {Object}
   * @memberof AuthRepository
   */
  decodeToken(token) {
    return this.jwt.decode(token);
  }

  /**
   * Generates a token.
   *
   * @param {Object} user
   * @param {String} key
   * @returns {String}
   * @memberof AuthRepository
   */
  generateToken(user, key) {
    return this.jwt.sign(user, key);
  }

  /**
   * Verify if the given token is valid.
   *
   * @param {String} token
   * @param {String} key
   * @returns {Boolean}
   * @memberof AuthRepository
   */
  verifyToken(token, key) {
    return this.jwt.verify(token, key);
  }
}

module.exports = AuthRepository;
