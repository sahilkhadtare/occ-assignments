export const adminUrl = 'https://asbx50c1dev-admin.occa.ocs.oraclecloud.com';
export const loginBearerToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjVmOGY5Ni00OGMyLTQzOWItYmY0MS1mNWI2ZWQ4YWFkODIiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE2NzQ4MTM3OTMsImlhdCI6MTY0MzI3Nzc5M30=.dUBZSImzbvpFx4YmDDR50peFpblvSwgKLOxBEYYCUZk=';

export const propertyArray = [
    'type',
    'avgCustRating',
    'description',
    'longDescription',
    'displayName',
    'id',
    'brand',
    'gender',
    'active',
    'primarySourceImageURL',
    'primaryImageTitle',
    'primaryImageAltText',
  ];
export const propertiesValueHash = {
    id: 'productId',
    primaryImageAltText: 'imageAltText',
    primarySourceImageURL: 'imageURL',
    primaryImageTitle: 'imageTitle',
    avgCustRating: 'productRating',
  };
export const DynPropHash = {
    shortText: 'dyn_str_',
    longText: 'dyn_str_',
    richText: 'dyn_str_',
    date: 'dyn_str_',
    number: 'dyn_dbl_',
    checkbox: 'dyn_bln_',
    enumerated: 'dyn_str_',
  };