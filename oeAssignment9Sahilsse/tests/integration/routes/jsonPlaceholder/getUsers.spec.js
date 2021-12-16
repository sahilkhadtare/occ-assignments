const { createDefaultSseClient } = require('../../utils');

describe('route: GET /v1/jsonPlaceholder/users', () => {
  const ENDPOINT_PATH = '/v1/jsonPlaceholder/users';
  const client = createDefaultSseClient();

  it('should return HTTP 200 with the list of registered users', async () => {
    const response = await client.get(ENDPOINT_PATH)

    expect(response.data).toBeDefined();
    expect(response.data.length).toBe(10);
  });
});
