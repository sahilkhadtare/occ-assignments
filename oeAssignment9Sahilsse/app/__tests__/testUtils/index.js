function expressResponseMock() {
  const res = {};

  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn();
  res.end = jest.fn();

  return res;
}

module.exports = {
  expressResponseMock
}