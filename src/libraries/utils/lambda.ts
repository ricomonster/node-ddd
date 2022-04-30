import { LambdaResponseOptions, LambdaResponse } from '../../shared/domain/Lambda';

export const renderResponse = ({
  body,
  status = 200,
  headers,
}: LambdaResponseOptions): Promise<LambdaResponse> => {
  let response: LambdaResponse = {
    statusCode: status,
    body: JSON.stringify(body),
    // Default header
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (headers) {
    // Override headers
    response = {
      ...response,
      headers: {
        ...response.headers,
        ...headers,
      },
    };
  }

  return Promise.resolve(response);
};

export type { LambdaResponseOptions, LambdaResponse };
