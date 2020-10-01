// Dependencies
const Status = require('http-status');

// Middlewares
const AuthorizeMiddleware = require('src/interfaces/http/middlewares/authorize');
const BaseController = require('./BaseController');

class AuthController extends BaseController {
  constructor() {
    super();
  }

  async login(req, res) {
    try {
      const loginAuth = req.container.resolve('loginAuth');
      const result = await loginAuth.execute(req.body);

      return res.status(Status.OK).json({
        data: result,
      });
    } catch (error) {
      switch (error.message) {
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(error.errors);

        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(error);
      }
    }
  }

  async register(req, res, next) {
    try {
      const registerAuth = req.container.resolve('loginAuth');
      const result = await registerAuth.execute(req.body);

      return res.status(Status.OK).json({
        message: 'Account successfully registered.',
        data: result,
      });
    } catch (error) {
      switch (error.message) {
        case 'Email already exists.':
        case 'Validation failed!':
          return res.status(Status.BAD_REQUEST).json(error.errors);

        default:
          return res.status(Status.SERVICE_UNAVAILABLE).json(error);
      }
    }
  }

  routes() {
    // Set the routes
    this.router.post('/login', this.login.bind(this));
    this.router.post('/register', this.register.bind(this));

    return {
      name: '/auth',
      // middleware: AuthorizeMiddleware,
      router: this.router,
    };
  }
}

module.exports = AuthController;
