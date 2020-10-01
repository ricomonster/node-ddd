class AuthRepository {
  constructor({ encryption, jwt }) {
    this.encryption = encryption;
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
   * @param {Integer} ttl
   * @returns {String}
   * @memberof AuthRepository
   */
  generateToken(user, key, ttl = 3600) {
    return this.jwt.sign(user, key, ttl);
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

  /**
   * Validates if the given raw password is the same to the encoded password.
   *
   * @param {String} password
   * @param {String} encodedPassword
   * @returns {Boolean}
   * @memberof AuthRepository
   */
  verifyPassword(password, encodedPassword) {
    return this.encryption.compare(password, encodedPassword);
  }
}

module.exports = AuthRepository;
