import { adminUrl, loginBearerToken } from '../Config.js';
import { JSONToURLEncoded } from '../ApiFunction.js';
import axios from 'axios';

const getAuthenticated = async () => {
  try {
    const res = await axios({
      method: 'post',
      url: `${adminUrl}/ccadmin/v1/login`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${loginBearerToken}`,
      },
      data: JSONToURLEncoded({
        grant_type: 'client_credentials',
      }),
    });
    return res.data.access_token;
  } catch (err) {
    console.log(err);
  }
};
export default getAuthenticated;
