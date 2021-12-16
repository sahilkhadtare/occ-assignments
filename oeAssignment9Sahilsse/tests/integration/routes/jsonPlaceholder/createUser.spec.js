const { createDefaultSseClient } = require('../../utils');

describe('route: POST /v1/jsonPlaceholder/users', () => {
  const ENDPOINT_PATH = '/v1/jsonPlaceholder/users';
  const client = createDefaultSseClient();

  it("should return HTTP 400 if user's name is missing from request body", async () => {
    try {
      const response = await client.post(ENDPOINT_PATH);
      fail('Enpoint call should fail with HTTP 400 error.');
    } catch (e) {
      expect(e.response).toBeDefined();
      expect(e.response.status).toBe(400);
      expect(e.response.data).toBe("Missing user's name.");
    }
  });

  it("should return HTTP 400 if user's username is missing from request body", async () => {
    try {
      const response = await client.post(ENDPOINT_PATH, { name: 'My User' });
      fail('Enpoint call should fail with HTTP 400 error.');
    } catch (e) {
      expect(e.response).toBeDefined();
      expect(e.response.status).toBe(400);
      expect(e.response.data).toBe("Missing user's username.");
    }
  });

  it("should return HTTP 400 if user's email is missing from request body", async () => {
    try {
      const response = await client.post(ENDPOINT_PATH, { name: 'My User', username: 'myuser' });
      fail('Enpoint call should fail with HTTP 400 error.');
    } catch (e) {
      expect(e.response).toBeDefined();
      expect(e.response.status).toBe(400);
      expect(e.response.data).toBe("Missing user's email.");
    }
  });

  it('should return HTTP 200 with the created user on a successful user creation', async () => {
    const userToCreate = {
      name: 'My User',
      username: 'myuser',
      email: 'myuseremail@mymail.com'
    };
    const response = await client.post(ENDPOINT_PATH, userToCreate);

    expect(response.status).toBe(200);
    expect(response.data).toBeDefined();
    expect(response.data.id).toBeDefined();
    expect(response.data.id).toBeGreaterThan(0);
    expect(response.data.data.name).toBe(userToCreate.name);
    expect(response.data.data.username).toBe(userToCreate.username);
    expect(response.data.data.email).toBe(userToCreate.email);
  });
});
