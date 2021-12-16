const { createHttpClient } = require('../httpClient');
const occConfig = require('../config');

jest.mock('../config');

beforeEach(() => {
  occConfig.getHttpProxy.mockReset();
  occConfig.getHttpsProxy.mockReset();
});

it("should add an HTTP proxy agent if it's available on the running environment", () => {
  occConfig.getHttpProxy.mockReturnValue('http://myproxyserver.com');
  const httpClient = createHttpClient();

  expect(httpClient).toBeDefined();
  expect(httpClient.defaults.httpAgent).toBeDefined();
  expect(httpClient.defaults.httpsAgent).not.toBeDefined();
});

it("should add an HTTPS proxy agent if it's available on the running environment", () => {
  occConfig.getHttpsProxy.mockReturnValue('https://mysecureproxyserver.com');
  const httpClient = createHttpClient();

  expect(httpClient).toBeDefined();
  expect(httpClient.defaults.httpsAgent).toBeDefined();
  expect(httpClient.defaults.httpAgent).not.toBeDefined();
});

it("should not use any proxy agent if there is no HTTP or HTTPS proxy available on the running environment", () => {
  const httpClient = createHttpClient();

  expect(httpClient).toBeDefined();
  expect(httpClient.defaults.httpsAgent).not.toBeDefined();
  expect(httpClient.defaults.httpAgent).not.toBeDefined();
});
