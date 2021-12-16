const { createHttpClient, HttpClientError } = require('../platform/httpClient');

/**
 * Client example using the JSONPlaceholder test service: https://jsonplaceholder.typicode.com/.
 */
class JSONPlaceholderClient {
  constructor() {
    this._client = createHttpClient({
      baseURL: 'https://jsonplaceholder.typicode.com'
    });
  }

  async getUsers() {
    try {
      const { data: users } = await this._client.get(`/users`);
      return users;
    } catch (e) {
      throw new HttpClientError(`Cannot get users. ${e.message}`, e.response);
    }
  }

  async getUser(userId) {
    try {
      const { data: user } = await this._client.get(`/users/${userId}`);
      return user;
    } catch (e) {
      throw new HttpClientError(`Cannot get user ${userId}. ${e.message}`, e.response);
    }
  }

  async createUser(userData) {
    try {
      const { data: createdUser } = await this._client.post(`/users`, { data: userData });
      return createdUser;
    } catch (e) {
      throw new HttpClientError(`Cannot create user. ${e.message}`, e.response);
    }
  }
}

module.exports = JSONPlaceholderClient;
