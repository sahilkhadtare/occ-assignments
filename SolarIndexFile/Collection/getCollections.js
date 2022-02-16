import ApiFunction from '../ApiFunction.js';
import { adminUrl } from '../Config.js';

const getCollections = async (catalogId) => {
  try {
    const res = await ApiFunction(
      'get',
      `${adminUrl}/ccadmin/v1/collections?catalogId=${catalogId}`,
      { 'Content-Type': 'application/x-www-form-urlencoded' },
      {}
    );

    return res.items;
  } catch (err) {
    console.log(err);
  }
};
export default getCollections;
