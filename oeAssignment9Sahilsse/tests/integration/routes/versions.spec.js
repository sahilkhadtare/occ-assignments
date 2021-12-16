const { createDefaultSseClient } = require('../utils');

describe('route: GET /v1/versions', () => {
  const ENDPOINT_PATH = '/v1/versions';
  const client = createDefaultSseClient();

  it("should return HTTP 200 with the NodeJS versions from the SSE's running environment on the response body", async () => {
    const response = await client.get(ENDPOINT_PATH);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(process.versions);
  });
});
