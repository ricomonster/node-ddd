class Login {
  constructor({ authRepository, logger, userRepository, validator }) {
    this.authRepository = authRepository;
    this.logger = logger;
    this.userRepository = userRepository;
    this.validator = validator;
  }

  async execute(data) {
    // validate
    const validation = await this.validate(data);

    // validate first
    if (validation.fails()) {
      const error = new Error('Validation failed!');
      error.errors = validation.getErrors();
      error.statusCode = 400;
      throw error;
    }

    // check if the email already exists
    const existing = await this.userRepository.findByField('email', data.email);

    if (!existing) {
      // throw an error
      const error = new Error('Email/password does not exists.');
      error.statusCode = 404;
      throw error;
    }

    // compare if the given password is the same
    const same = this.authRepository.verifyPassword(data.password, existing.password);

    if (!same) {
      // throw an error
      const error = new Error('Email/password does not exists.');
      error.statusCode = 404;
      throw error;
    }

    // we're good
    // setup the data that we need to pass to create a token.
    const info = {
      id: existing.id,
      email: existing.email,
    };

    // generate token
    // let's use the date for additional encryption to the token
    const date = new Date();
    const token = this.authRepository.generateToken(info, date.valueOf().toString());

    // return the user and token
    return {
      user: info,
      token,
    };
  }

  validate(data) {
    return this.validator.make(data, {
      email: ['required', 'email'],
      password: ['required'],
    });
  }
}

module.exports = Login;
