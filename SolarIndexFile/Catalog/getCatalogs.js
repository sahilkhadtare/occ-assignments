import ApiFunction from '../ApiFunction.js';
import { adminUrl } from '../Config.js';

const createQueryString = (Input) => {
  let query = '';
  for (let i = 0; i < Input.length - 1; i++) {
    query = `${query}id eq "${Input[i]}" or `;
  }
  query = `${query}id eq "${Input[Input.length - 1]}"`;
  return query;
};

const getCatalogs = async (catalogInput) => {
  try {
    const catalogQuery = catalogInput.length > 0 ? createQueryString(catalogInput) : '';
    const data = await ApiFunction(
      'get',
      `${adminUrl}/ccadmin/v1/catalogs?q=${catalogQuery}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      {}
    );
    const catalogsArray = data.items.map((item) => {
      const obj = {};
      obj['id'] = item.id;
      obj['rootCategory'] = [];
      if (item.baseCatalog) {
        item.baseCatalog.rootCategories.map((rootC) => {
          obj['rootCategory'].push(rootC.repositoryId);
        });
      }
      item.rootCategories.map((rootC) => {
        obj['rootCategory'].push(rootC.repositoryId);
      });
      return obj;
    });
    return catalogsArray;
  } catch (err) {
    console.log(err);
  }
};
export default getCatalogs;
