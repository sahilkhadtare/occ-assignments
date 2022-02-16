import axios from 'axios';
import getAuthenticated from './Authentication/login.js';

export const JSONToURLEncoded = (obj) => {
  var str = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return str.join('&');
};

const ApiFunction = async (method, url, headers, body) => {
  const loginBearerToken = await getAuthenticated();
  const fetchApi = async () => {
    const res = await axios({
      method: method ? method : 'get',
      url: url,
      headers: { ...headers, Authorization: `Bearer ${loginBearerToken}` },
      data: JSONToURLEncoded(body),
    });
    return res.data;
  };
  try {
    const res = await fetchApi();
    return res;
  } catch (err) {
    console.log(err);
  }
};
export default ApiFunction;
