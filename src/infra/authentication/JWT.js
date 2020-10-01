// dependencies
const jwt = require('jsonwebtoken');

class JWT {
  constructor({ config }) {
    this.config = config;
  }

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
   * @param {Integer} ttl
   * @returns {String}
   * @memberof JWT
   */
  sign(user, key, ttl = 3600) {
    return jwt.sign(user, key, {
      expiresIn: ttl,
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
