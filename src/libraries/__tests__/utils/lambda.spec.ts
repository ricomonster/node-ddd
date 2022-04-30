// Function to test
import { renderResponse } from '../../utils/lambda';

describe('Libraries :: Utils :: Lambda', () => {
  it('should return an object that can be passed as a lambda response.', async () => {
    const response = await renderResponse({ body: { test: 1234 } });

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ test: 1234 }));
    expect(response.headers).toHaveProperty('Content-Type');
  });

  it('should return with an overrided headers.', async () => {
    const response = await renderResponse({
      body: { test: 1234 },
      headers: { 'Content-Type': 'text/html' },
    });

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify({ test: 1234 }));
    expect(response.headers).toHaveProperty('Content-Type');
    expect(response.headers['Content-Type']).toBe('text/html');
  });

  it('should override the default status code.', async () => {
    const response = await renderResponse({
      body: { test: 1234 },
      status: 400,
    });

    expect(response).toBeTruthy();
    expect(response).toHaveProperty('statusCode');
    expect(response).toHaveProperty('body');
    expect(response).toHaveProperty('headers');
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe(JSON.stringify({ test: 1234 }));
    expect(response.headers).toHaveProperty('Content-Type');
  });
});
