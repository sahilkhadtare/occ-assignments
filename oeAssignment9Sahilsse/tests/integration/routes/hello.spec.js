const { createDefaultSseClient } = require('../utils');

describe('route: POST /v1/hello', () => {
  const ENDPOINT_PATH = '/v1/hello';
  const client = createDefaultSseClient();

  it('should return HTTP 200 with a hello msg on the response body', async () => {
    const response = await client.post(ENDPOINT_PATH);

    expect(response.status).toBe(200);
    expect(response.data).toEqual({ message: 'hello!' });
  });
});
