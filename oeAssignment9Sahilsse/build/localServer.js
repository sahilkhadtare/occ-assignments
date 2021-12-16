const nconf = require('nconf');
const express = require('express');
const winston = require('winston');

const { combine, simple, colorize } = winston.format;

function createLocalServer(options = {}) {
  const app = express();
  const logger = winston.loggers.add('occsapp', {
    format: combine(simple()),
    transports: [
      new winston.transports.Console({ level: options.loggerLevel || 'debug', format: combine(colorize(), simple()) })
    ]
  });

  nconf.reset();
  nconf.argv().env();

  if (options.nconfFile) {
    nconf.file({ file: options.nconfFile });
  }

  app.use((req, res, next) => {
    if (!res.locals) {
      res.locals = {};
    }

    // http://expressjs.com/en/api.html#res.locals
    // use res.locals to pass object between main and sub apps
    res.locals.logger = logger;
    next();
  });

  // Set sub-app path to simulate the OCC server behavior
  app.use('/ccstorex/custom', require('../app/index'));

  return app;
}

module.exports = {
  createLocalServer
};
