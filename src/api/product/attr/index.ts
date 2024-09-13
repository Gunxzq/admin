import request from '@/utils/request';
import type {
  CategoryResponseData,
  AttrResponseData,
  Attr,
  ResponseData,
} from '@/api/product/attr/type';
enum API {
  C1_URL = '/product/category1',
  C2_URL = '/product/category2',
  C3_URL = '/product/category3',
  ATTR_URL = '/product/attrinfoList',
  ADDORUPDATEATTR = '/product/saveAttrInfo',
  DELETEATTR_URL = '/product/delete',
}

export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);

export const reqC2 = (category2Id: string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + `/${category2Id}`);

export const reqC3 = (category3Id: string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + `/${category3Id}`);

export const reqAttr = (
  category1Id: String | Number,
  category2Id: String | Number,
  category3Id: String | Number,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `/${category1Id}/${category2Id}/${category3Id}`,
  );

// 添加属性
export const reqAddAttr = (data: Attr) =>
  request.post<any, ResponseData>(API.ADDORUPDATEATTR, data);

// 删除属性
export const reqDelAttr = (id: Number | String) =>
  request.delete<any, ResponseData>(API.DELETEATTR_URL + `/${id}`);
