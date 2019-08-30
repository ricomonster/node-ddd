// dependencies
const jwt = require('jsonwebtoken');

class JWT {
  /**
   * Decodes the content of a given token.
   *
   * @param {String} token
   * @returns {Object}
   * @memberof JWT
   */
  decode(token) {
    return jwt.decode(token);
  }

  /**
   * Generates a token based on the given user info.
   *
   * @param {Object} user
   * @param {String} key
   * @returns {String}
   * @memberof JWT
   */
  sign(user, key) {
    return jwt.sign(user, key, {
      // TODO: this can be also set via config
      expiresIn: 3600,
    });
  }

  /**
   * Validates the given token.
   *
   * @param {String} token
   * @param {String} key
   * @memberof JWT
   */
  verify(token, key) {
    return jwt.verify(token, key);
  }
}

module.exports = JWT;
