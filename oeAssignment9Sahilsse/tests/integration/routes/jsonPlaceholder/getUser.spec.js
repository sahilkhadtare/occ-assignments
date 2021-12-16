const { createDefaultSseClient } = require('../../utils');

describe('route: GET /v1/jsonPlaceholder/users/:id', () => {
  const ENDPOINT_PATH = '/v1/jsonPlaceholder/users/1';
  const client = createDefaultSseClient();

  it('should return HTTP 200 with user data specified by its ID', async () => {
    const response = await client.get(ENDPOINT_PATH);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBe(1);
    expect(response.data.name).toBe('Leanne Graham');
    expect(response.data.username).toBe('Bret');
    expect(response.data.email).toBe('Sincere@april.biz');
  });
});
