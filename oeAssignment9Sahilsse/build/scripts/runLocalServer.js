const { join } = require('path')
const { existsSync } = require('fs')

const { createLocalServer } = require('../localServer')

const options = { loggerLevel: 'debug' };
const localNconfFilePath = join(__dirname, 'localExtensionServerSettings.json');

if (existsSync(localNconfFilePath)) {
  options.nconfFile = localNconfFilePath;
}

const server = createLocalServer(options);

localServerConnection = server.listen(process.env.npm_package_config_port || 3000);
