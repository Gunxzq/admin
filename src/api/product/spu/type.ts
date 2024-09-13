export interface ResponseData {
  code: Number;
  message: String;
  ok: boolean;
}

export interface SpuData {
  id?: string | Number;
  spuName: String;
  description: String;
  categroy3Id: string | Number;
  tmId: Number | String;
  spuSaleAttrList: saleAttr;
  spuImageList: null;
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
  data: {
    records: Records;
    total: Number;
    Size: Number;
    current: Number;
    searchCount: boolean;
    pages: Number;
  };
}

export interface Trademark {
  id: String | Number;
  tmName: String;
  logoUrl: String;
}

export interface AllTradeMark extends ResponseData {
  data: Trademark[];
}

export interface SpuImg {
  id: String | Number;
  imageName: String;
  imgUrl: String;
  spuId: String | Number;
}

export interface SpuHasImg extends ResponseData {
  data: SpuImg[];
}

export interface SaleAttrValue {
  id?: String | Number;
  spuId: String | Number;
  baseSaleAttrId: String | Number;
  saleAttrValueName: String;
  isChecked: boolean;
}

export type spuSaleAttrValueList = SaleAttrValue[];

export interface saleAttr {
  baseSaleAttrId: String | Number;
  id: String | Number;
  saleAttrName: String;
  spuId: String | Number;
  spuSaleAttrValueList: spuSaleAttrValueList;
  flag?: boolean;
  saleAttrValue?: String;
}

export interface SaleAttrResponseData extends ResponseData {
  data: saleAttr[];
}

export interface HasSaleAttr {
  id: String | Number;
  name: String;
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[];
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
  skuSaleAttrValueList: saleAttr[];
  skuDefaultImg: String;
}

export interface SkuInfoData extends ResponseData {
  data: SkuData[];
}
