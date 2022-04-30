import { Handler, APIGatewayEvent } from 'aws-lambda';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Validator from 'validatorjs';

// Container
import { container } from '../../../../../container';

// Utils
import { renderResponse, LambdaResponse } from '../../../../../libraries/utils/lambda';

// Typings
import { CreateUserOptions } from '../../../application/CreateUser';

interface RegisterUserRequestBody extends CreateUserOptions {
  confirm_password: string;
}

const registerUserValidationRules = {
  name: 'required',
  email: 'required|email',
  password: 'required|min:6',
  confirm_password: 'required|same:password',
};

const METHOD = 'POST';
const ENDPOINT = '/user/register';
const registerUser: Handler = async (event: APIGatewayEvent): Promise<LambdaResponse> => {
  const logger = container.resolve('logger');
  const createUserApp = container.resolve('createUser');

  // Perform some validations
  if (!event || !event.body) {
    return renderResponse({
      body: { message: ReasonPhrases.BAD_REQUEST },
      status: StatusCodes.BAD_REQUEST,
      headers: { 'X-Status-Reason': ReasonPhrases.BAD_REQUEST },
    });
  }

  const body = JSON.parse(event.body) as RegisterUserRequestBody;

  // Validate the request body
  const validation = new Validator(body, registerUserValidationRules);

  if (validation.fails()) {
    // Throw an error
    return renderResponse({
      body: { errors: validation.errors.all() },
      status: StatusCodes.UNPROCESSABLE_ENTITY,
      headers: { 'X-Status-Reason': ReasonPhrases.UNPROCESSABLE_ENTITY },
    });
  }

  try {
    delete body.confirm_password;

    await createUserApp.start(body as CreateUserOptions);
  } catch (error) {
    logger.error(`[${METHOD} ${ENDPOINT}] Error`);

    if (error instanceof Error) {
      logger.error(`[${METHOD} ${ENDPOINT}] ${error.stack}`);
    }

    return renderResponse({
      body: { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      headers: { 'X-Status-Reason': ReasonPhrases.INTERNAL_SERVER_ERROR },
    });
  }

  return renderResponse({ body: { message: 'User created!' } });
};

export type { RegisterUserRequestBody };
export default registerUser;
