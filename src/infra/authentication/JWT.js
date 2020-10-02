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
   * Generates a token based on the given info.
   *
   * @param {Object} data
   * @param {String} key
   * @param {Integer} ttl
   * @returns {String}
   * @memberof JWT
   */
  sign(data, key, ttl = 3600) {
    return jwt.sign(data, key, {
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
