export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface Attr {
  attrId: string | Number;
  valued: string | Number;
}

export interface SaleAttr {
  saleAttrId: string | Number;
  saleAttrValueId: string | Number;
}

export interface SkuData {
  categroy3Id: string | Number;
  spuId: String | Number;
  tmId: Number | String;
  skuName: String;
  price: Number;
  weight: Number;
  skuDesc: String;
  skuAttrValueList: Attr[];
  skuSaleAttrValueList: SaleAttr[];
  skuDefaultImg: String;
  isSale?: Number;
}

export interface SkuResponseData extends ResponseData {
  data: {
    record: SkuData[];
    total: Number;
    size: Number;
    current: Number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: String;
    maxLimit: Number;
    searchCount: boolean;
    pages: Number;
  };
}

export interface SkuInfoData extends ResponseData {
  data: SkuData;
}
