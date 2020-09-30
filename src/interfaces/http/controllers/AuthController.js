// Dependencies
const Status = require('http-status');

const BaseController = require('./BaseController');

class AuthController extends BaseController {
  constructor() {
    super();

    // Fetch the app that we only need here
    this.loginAuth = this.container.loginAuth;
    this.registerAuth = this.container.registerAuth;
  }

  async login(req, res) {
    try {
      const result = await this.loginAuth.execute(req.body);

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
      const result = await this.registerAuth.execute(req.body);

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
      router: this.router,
    };
  }
}

module.exports = AuthController;
