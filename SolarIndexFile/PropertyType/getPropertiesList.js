import ApiFunction from '../ApiFunction.js';
import { adminUrl } from '../Config.js';
import * as fs from 'fs';

const getProductTypeList = async () => {
  try {
    const data = await ApiFunction(
      'get',
      `${adminUrl}/ccadmin/v1/productTypes`,
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      {}
    );
    const productTypeArray = data.items.map((item) => item.id);
    return productTypeArray;
  } catch (err) {
    console.log(err);
  }
};

const getPropertiesList = async () => {
  try {
    const ProductTypeArray = await getProductTypeList();
    const ProductProperties = {};
    for (let type of ProductTypeArray) {
      const ProductObject = {};
      const data = await ApiFunction(
        'get',
        `${adminUrl}/ccadmin/v1/productTypes/${type}`,
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        {}
      );
      ProductObject['skuProperties'] = [];
      ProductObject['variants'] = [];
      ProductObject['specifications'] = [];
      data['skuProperties'].map((properties) => {
        const temp = {};
        temp['type'] = properties.type;
        temp['id'] = properties.id;
        ProductObject['skuProperties'].push(temp);
      });
      data['variants'].map((properties) => {
        ProductObject['variants'].push(properties.id);
      });
      data['specifications'].map((properties) => {
        const temp = {};
        temp['type'] = properties.type;
        temp['id'] = properties.id;
        ProductObject['specifications'].push(temp);
      });

      ProductProperties[type] = ProductObject;
    }
    return ProductProperties;
  } catch (err) {
    console.log(err);
  }
};

export default getPropertiesList;
