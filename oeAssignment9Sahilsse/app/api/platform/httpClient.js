const url = require('url');
const axios = require('axios');
const tunnel = require('tunnel');
const { getHttpProxy, getHttpsProxy } = require('./config');

class HttpClientError extends Error {
  constructor(message, httpResponse) {
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.statusCode = (httpResponse && httpResponse.status) || 500;
    this.data = (httpResponse && httpResponse.data) || null;
    this.httpResponse = httpResponse;
  }
}

/**
 * Create a new HTTP client. It automatically pass connections under the OMCS proxy server.
 *
 * @param {*} clientOptions The HTTP client options. Check https://github.com/axios/axios#request-config to see all the available options.
 */
function createHttpClient(clientOptions = {}) {
  const otherOptions = {};

  const httpProxy = getHttpProxy();
  if (httpProxy) {
    const { hostname: host, port } = url.parse(httpProxy);
    otherOptions.httpAgent = tunnel.httpOverHttp({ proxy: { host, port } });
  }

  const httpsProxy = getHttpsProxy();
  if (httpsProxy) {
    const { hostname: host, port } = url.parse(httpsProxy);
    otherOptions.httpsAgent = tunnel.httpsOverHttp({ proxy: { host, port } });
  }

  return axios.create(Object.assign({}, otherOptions, clientOptions));
}

module.exports = {
  HttpClientError,
  createHttpClient
};
