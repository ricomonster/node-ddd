// Dependencies
const Status = require('http-status');

const authorize = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(Status.UNAUTHORIZED).json({
      message: 'Unauthorized access.',
    });
  }

  const authorizeAuth = req.container.resolve('authorizeAuth');
  const userAuth = req.container.resolve('userAuth');
  try {
    // Validate the token
    const user = await authorizeAuth.execute(req.headers['authorization']);

    // Set the user
    userAuth.setUser(user);

    // Move along
    next();
  } catch (error) {
    switch (error.message) {
      case 'Token expired.':
        return res.status(Status.UNAUTHORIZED).json({
          message: 'Token expired.',
        });

      default:
        return res.status(Status.UNAUTHORIZED).json({
          message: 'Unauthorized access.',
        });
    }
  }
};

module.exports = authorize;
