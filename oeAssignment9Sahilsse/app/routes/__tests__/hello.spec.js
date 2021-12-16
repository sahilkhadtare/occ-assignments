const routeHandler = require('../hello');
const { expressResponseMock } = require('../../__tests__/testUtils');

jest.mock('../../api/platform/logger'); // suppress logger statements

it('should return HTTP 200 with a hello msg on the response body', async () => {
  const req = {};
  const res = expressResponseMock();

  await routeHandler(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'hello!' });
});
