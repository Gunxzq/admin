import request from '@/utils/request';
import { SkuResponseData, SkuInfoData } from './types';

enum API {
  SKU_URL = '/product/list',
  CANCELSALE_URL = '/product/cancelSale',
  SALE_URL = '/product/onSale',
  SKUINFO_URL = '/product/get/getSkuInfo',
  DELESKU_URL = '/product/del/deleteSku',
}

export const reqSkuList = (page: number, limit: number) => request.get<SkuResponseData>(API.SKU_URL + `/${page}/${limit}`);

export const reqSaleSku = (skuId: Number | String) => request.get<any>(API.SALE_URL + `/${skuId}`);

export const reqCancelSale = (skuId: Number | String) => request.get<any>(API.CANCELSALE_URL + `/${skuId}`);

export const reqSkuInfo = (skuId: Number | String) => request.get<SkuInfoData>(API.SKUINFO_URL + `/${skuId}`);

export const reqDelSku = (skuId: Number | String) => request.get<any>(API.DELESKU_URL + `/${skuId}`);
