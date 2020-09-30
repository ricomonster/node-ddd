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
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.loginAuth.events;

    this.loginAuth
      .on(SUCCESS, (result) => {
        return res.status(Status.OK).json(result);
      })
      .on(NOT_FOUND, (error) => {
        return res.status(Status.NOT_FOUND).json(error);
      })
      .on(VALIDATION_ERROR, (error) => {
        return res.status(Status.BAD_REQUEST).json(error);
      })
      .on(ERROR, (error) => {
        return res.status(Status.SERVICE_UNAVAILABLE).json(error);
      });

    this.loginAuth.execute(req.body);
  }

  async register(req, res, next) {
    const { operation } = req;
    const { SUCCESS, VALIDATION_ERROR, ERROR } = operation.events;

    operation
      .on(SUCCESS, (result) => {
        res.status(Status.OK).json({
          message: 'Account successfully registered.',
          data: result,
        });

        res.end();
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json(error);
        res.end();
      })
      .on(ERROR, next);

    return operation.execute(req.body);
  }

  routes() {
    // Set the routes
    this.router.post('/login', this.injector(this.loginAuth), this.login);
    this.router.post('/register', this.injector(this.registerAuth), this.register);

    return {
      name: '/auth',
      router: this.router,
    };
  }
}

module.exports = AuthController;
