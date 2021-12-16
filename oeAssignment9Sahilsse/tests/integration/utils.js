const axios = require('axios');

function createDefaultSseClient(options = {}) {
  const host = process.env.EXT_SERVER_URL || options.host || 'http://127.0.0.1:3000';

  const client = axios.create({
    baseURL: `${host}/ccstorex/custom`
  });

  return client;
}

module.exports = {
  createDefaultSseClient
};
