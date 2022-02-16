import { adminUrl } from '../Config.js';
import ApiFunction from '../ApiFunction.js';

const getSiteArray = async () => {
  try {
    const res = await ApiFunction(
      'get',
      `${adminUrl}/ccadmin/v1/sites?q=enabled eq true`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      {}
    );
    const SiteArray = res.items.map((item) => item.repositoryId);
    return SiteArray;
  } catch (err) {
    console.log(err);
  }
};
export default getSiteArray;
