// dependencies
const bcrypt = require('bcrypt');

class Encryption {
  /**
   * Compares if the given raw string password is equal to the encoded password
   * when encrypted.
   *
   * @param {String} password
   * @param {String} encodedPassword
   * @returns {Boolean}
   * @memberof Encryption
   */
  compare(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword);
  }

  /**
   * Encrypts and add salt to the password string.
   *
   * @param {String} password
   * @returns {Boolean}
   * @memberof Encryption
   */
  encrypt(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}

module.exports = Encryption;
