const nconf = require('nconf');

/**
 * Get an environment variable.
 *
 * @param {*} name The environment variable name.
 */
function getCustomVariable(name) {
  return process.env[name];
}

/**
 * Get OCC admin URL.
 */
function getAdminUrl() {
  return nconf.get('atg.server.admin.url');
}

/**
 * Get OCC agent URL.
 */
function getAgentUrl() {
  return nconf.get('atg.server.agent.url');
}

/**
 * Get OCC storefront URL.
 */
function getStoreUrl() {
  return nconf.get('atg.server.url');
}

/**
 * Get the OCC ccadmin application token.
 */
function getAdminToken() {
  return nconf.get('atg.application.credentials:atg.application.token');
}

/**
 * Get the HTTP proxy server URL.
 */
function getHttpProxy() {
  return process.env.HTTP_PROXY || process.env.http_proxy || nconf.get('general:proxy-server');
}

/**
 * Get the HTTPS proxy server URL.
 */
function getHttpsProxy() {
  return process.env.HTTPS_PROXY || process.env.https_proxy || getHttpProxy();
}

module.exports = {
  getCustomVariable,
  getAdminUrl,
  getAgentUrl,
  getStoreUrl,
  getAdminToken,
  getHttpProxy,
  getHttpsProxy
};
