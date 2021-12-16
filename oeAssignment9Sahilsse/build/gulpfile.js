const jasmine = require('gulp-jasmine');
const { join } = require('path');
const { existsSync } = require('fs');
const { task, series, src } = require('gulp');

const { createLocalServer } = require('./localServer');

let localServerConnection = null;

function runLocalServer() {
  return new Promise(resolve => {
    const options = { loggerLevel: 'error' };
    const localNconfFilePath = join(__dirname, '..', 'localExtensionServerSettings.json');

    if (existsSync(localNconfFilePath)) {
      options.nconfFile = localNconfFilePath;
    }

    const server = createLocalServer(options);

    localServerConnection = server.listen(process.env.npm_package_config_port || 3000, () => {
      // waiting for all routes to be loaded
      setTimeout(resolve, 500);
    });
  });
}

function stopLocalServer() {
  return new Promise((resolve, reject) => {
    localServerConnection.close(err => (err ? reject(err) : resolve()));
  });
}

function runIntegrationTests() {
  return src('./tests/integration/**/*.spec.js').pipe(
    jasmine({ verbose: true, includeStackTrace: true, config: { defaultTimeoutInterval: 1000 } })
  );
}

task('test:integration', series(runLocalServer, runIntegrationTests, stopLocalServer));
