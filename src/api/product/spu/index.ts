import request from '../../../utils/request';
import type {
  HasSpuResponseData,
  AllTradeMark,
  ResponseData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SkuData,
  SkuInfoData,
} from './type';

enum API {
  HASSPU_URL = '/product',
  ALLTRADEMARK_URL = '/product/baseTrademark/getTrademarkList',
  IMAGE_UTL = '/product/get/spuImageList',
  SPUHASSALLATTR_URL = '/product/get/SaleAttrList',
  ALLSALEATTR_URL = '/product/baseSaleAttrList',
  ADD_URL = '/product/saveSpuInfo',
  UPDATE_URL = '/product/updateSpuInfo',
  ADDSKU_URL = '/prodect/saveSkuInfo',
  SKUINFO_URL = '/product/get/findBySpuId',
  REMOVESPU_URL = '/product/del/deleteSpu',
}

export const reqHasSpu = (
  page: Number,
  limit: Number,
  category3Id: string | Number,
) =>
  request.get<any, HasSpuResponseData>(
    API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`,
  );

export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL);

export const reqSpuImageList = (spuId: Number | String) =>
  request.get<any, SpuHasImg>(API.IMAGE_UTL + `/${spuId}`);

export const reqSpuHasSaleAttr = (spuId: Number | String) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALLATTR_URL + `/${spuId}`);

export const reqAllSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL);

export const reqAddOrUpdate = (data: any) => {
  if (data.id) {
    return request.post<any, ResponseData>(API.UPDATE_URL, data);
  } else {
    return request.post<any, ResponseData>(API.ADD_URL, data);
  }
};

export const reqAddSku = (data: any) =>
  request<any, SkuData>(API.ADDSKU_URL, data);

export const reqSkuList = (spuId: Number | String) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + `/${spuId}`);

export const reqRemoveSku = (spuId: Number | String) =>
  request.delete<any, SkuInfoData>(API.REMOVESPU_URL + `/${spuId}`);
