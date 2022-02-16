import getCatalogs from './Catalog/getCatalogs.js';
import getCollections from './Collection/getCollections.js';
import getSiteArray from './Site/getSiteArray.js';
import getPropertiesList from './PropertyType/getPropertiesList.js';
import getProducts from './Products/getProducts.js';
import { propertyArray, propertiesValueHash, DynPropHash } from './Config.js';

const getDynProductProperties = (product, type, ProductProperties) => {
  const DynPropObject = {};
  if (product.type) {
    ProductProperties[type]['specifications'].map((prop) => {
      if (product[prop.id]) {
        DynPropObject[`${DynPropHash[prop.type]}${prop.id}`] = product[prop.id];
      }
    });
  }
  return DynPropObject;
};
const getDynSkuProperties = (sku, type, ProductProperties) => {
  const DynSkuObject = {};
  if (type) {
    ProductProperties[type]['skuProperties'].map((prop) => {
      if (sku[prop.id]) {
        DynSkuObject[`${DynPropHash[prop.type]}${prop.id}`] = sku[prop.id];
      }
    });
  }
  return DynSkuObject;
};

const getProductProperties = (catalog, collection, product) => {
  const PropertyObject = {};
  PropertyObject['catalog'] = catalog.id;
  const categoryArray = [];
  if (collection.categoryIdPaths) {
    collection.categoryIdPaths.map((path) => {
      const pathString = path.replace('>', '/');
      for (let val of catalog.rootCategory) {
        if (pathString.includes(val)) {
          categoryArray.push(pathString);
          break;
        }
      }
    });
  }
  PropertyObject['categories'] = [...categoryArray];
  PropertyObject['new'] = product['x_flag'] ? product['x_flag'] : null;
  propertyArray.map((prop) => {
    const index = propertiesValueHash[prop] ? propertiesValueHash[prop] : prop;
    PropertyObject[index] = product[prop] ? product[prop] : null;
  });
  return PropertyObject;
};

const getSkuProperties = (product, sku, ProductProperties) => {
  const skuObject = {};
  const salePriceProduct = product.salePrice;
  const salePriceProductArray = product.salePrices;
  const salePriceSku = sku.salePrice;
  const salePriceSkuArray = sku.salePrices;

  skuObject['skuId'] = sku.repositoryId;
  if (product.type) {
    const variantsObject = ProductProperties[product.type];
    if (variantsObject) {
      variantsObject['variants'].map((variant) => {
        skuObject[`dyn_variant_${variant}`] = sku[variant] ? sku[variant] : null;
      });
    }
  }
  skuObject['price'] = salePriceSku ? salePriceSku : salePriceProduct;

  for (let key in salePriceProductArray) {
    const Price = salePriceSkuArray[key] ? salePriceSkuArray[key] : salePriceProductArray[key];
    if (Price) {
      skuObject[`dyn_price_${key}`] = Price;
    }
  }
  skuObject['available'] = sku.quantity > 0 ? true : false;

  return skuObject;
};

const SolarIndex = async (catalogInput, productInput) => {
  try {
    const SolarIndexArray = [];

    const catalogsArray = await getCatalogs(catalogInput);
    const siteList = await getSiteArray();
    const ProductProperties = await getPropertiesList();

    for (let catalog of catalogsArray) {
      let productMap = {};
      const collectionsArray = await getCollections(catalog.id);

      for (let collection of collectionsArray) {
        const productArray = await getProducts(collection.id, catalog.id, productInput);

        for (let product of productArray) {
          const PropObject = getProductProperties(catalog, collection, product);
          const DynPropObject = getDynProductProperties(product, product.type, ProductProperties);
          const object = { ...PropObject, ...DynPropObject };

          for (let sku of product.childSKUs) {
            if (!productMap.hasOwnProperty(`${product.id}-${sku.repositoryId}`)) {
              const skuProperties = getSkuProperties(product, sku, ProductProperties);
              const skuDynObj = getDynSkuProperties(sku, product.type, ProductProperties);
              const skuObject = { ...object, ...skuProperties, ...skuDynObj };
              productMap[`${product.id}-${sku.repositoryId}`] = SolarIndexArray.length;
              SolarIndexArray.push(skuObject);
            } else {
              const indexMap = productMap[`${product.id}-${sku.repositoryId}`];
              object['categories'].map((category) => {
                const CategoryArray = SolarIndexArray[indexMap].categories;
                SolarIndexArray[indexMap].categories = [...CategoryArray, category];
              });
            }
          }
        }
      }
      productMap = {};
    }
    const SolarIndexJson = [];
    for (let site of siteList) {
      for (let product of SolarIndexArray) {
        const temp = {
          id: `${product.skuId}-${product.productId}-${site}-${product.catalog}`,
        };
        const obj = { ...product, ...temp };
        obj['siteId'] = site;
        SolarIndexJson.push(obj);
      }
    }
    console.log(SolarIndexJson.length);
    return SolarIndexJson;
  } catch (err) {
    console.log(err);
  }
};
export default SolarIndex;
