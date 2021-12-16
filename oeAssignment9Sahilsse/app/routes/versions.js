const logger = require('../api/platform/logger');

/**
 * Send back the node versions used by OCC extension server.
 *
 * @param {!Object} req The expressJS request object.
 * @param {!Object} res The expressJS response object.
 */
async function routeHandler(req, res) {
  logger.info('[oeAssignment9Sahil] Generating NodeJS versions');
  res.status(200).json(process.versions);
}

module.exports = routeHandler;
