import request from '@/utils/request';
import {
  trademarkResponseData,
  trademark,
  ResponseData,
} from '@/api/product/trademark/type';
enum API {
  TRAEMARK_URL = '/product/baseTrademark/',
  UPDATETRAEMARK_URLL = '/product/baseTrademark/update',
  ADDTRAEMARK_URL = '/product/baseTrademark/save',
  DELETE_URL = '/product/baseTrademark/remove/',
}

export const reqHasTrademark = (page: number, limit: number) => {
  return request.get<any, trademarkResponseData>(
    API.TRAEMARK_URL + `${page}/${limit}`,
  );
};

export const reqAddOrUpdateTrademark = (data: trademark) => {
  if (data.id === '') return request.post<any>(API.ADDTRAEMARK_URL, data);
  return request.post<any, ResponseData>(API.UPDATETRAEMARK_URLL, data);
};

export const reqDelTrademark = (id: number) => {
  return request.delete<any, ResponseData>(API.DELETE_URL + `${id}`);
};
