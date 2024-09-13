import request from '@/utils/request';
import { PermissionResponseData, MenuParams } from './type';

enum API {
  ALLPERMISSION_URL = '/acl/permission',
  ADDPERMISSION_URL = '/acl/permission/save',
  UPDATE_URL = '/acl/permission/update',
  REMOVEROLE_URL = '/acl/permission/remove',
}

export const reqAllPermission = () => request.get<PermissionResponseData, any>(API.ALLPERMISSION_URL);

export const reqAddOrUpdate = (data: MenuParams) => {
  if (data.id) {
    return request.put<any>(API.UPDATE_URL, data);
  } else {
    return request.post<any>(API.ADDPERMISSION_URL, data);
  }
};

export const reqRemoveMenu = (menuId: Number | String) => request.delete<any>(API.REMOVEROLE_URL + `/${menuId}`);
