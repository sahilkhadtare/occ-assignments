/**
 * This is the entry point for the server-side extension.
 *
 * This code is using the ECMAScript features supported
 * in the version 8.11.1 of NodeJS (Present in OCC 18.4.1.9).
 *
 * To check which ECMAScript features you can use,
 * my suggestion get the NodeJS version from the OCC environment
 * you are working now. To do so, you can make a GET request
 * to "/ccstorex/custom/v1/versions".
 *
 * With the version, access https://node.green/ and check which
 * features you can use.
 *
 * Cheers ;)
 */
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./api/platform/logger');

const sse = new express.Router();
sse.use(bodyParser.json({}));

(async function() {
  try {
    const loadRoutes = require('./routes');

    await loadRoutes(sse);
    logger.debug('[oeAssignment9Sahil] All routes for SSE are loaded');
  } catch (e) {
    logger.error(`[oeAssignment9Sahil] Cannot load routes. ${e.stack}`);
  }
})();

module.exports = sse;
