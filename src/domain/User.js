const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: String,
  email: String,
  emailVerifiedAt: Number,
  password: String,
  createdAt: Number,
  updatedAt: Number,
})(class User {});

module.exports = User;
