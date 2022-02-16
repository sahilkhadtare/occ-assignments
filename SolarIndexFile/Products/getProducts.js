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

const getProducts = async (collectionId, catalogId, productArray) => {
  try {
    const productQuery = productArray.length > 0 ? createQueryString(productArray) : '';
    let Items = [];

    const res = await ApiFunction(
      'get',
      `${adminUrl}/ccadmin/v1/products?categoryId=${collectionId}&expand=true&catalogId=${catalogId}&q=${productQuery}`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      {}
    );
    Items = [...res.items];
    let limit = res.limit;
    let offset = res.offset + res.limit;
    let TotalResult = res.totalResults;
    while (offset < TotalResult) {
      console.log('sahil');
      console.log(offset);
      console.log(totalResults);
      const response = await ApiFunction(
        'get',
        `${adminUrl}/ccadmin/v1/products?categoryId=${collectionId}&expand=true&catalogId=${catalogId}&q=${productQuery}&offset=${offset}`,
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        {}
      );
      offset += limit;
      Items = [...Items, ...response.items];
    }

    return Items;
  } catch (err) {
    console.log(err);
  }
};
export default getProducts;
