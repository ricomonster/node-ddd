const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: String,
  email: String,
  password: String,
  active: Boolean,
  verifiedAt: Date,
  createdAt: Date,
  updatedAt: Date,
})(class User {});

module.exports = User;
