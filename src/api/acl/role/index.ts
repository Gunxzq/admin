import request from '@/utils/request';
import { RoleResponseData, RoleData, MenuResponseData } from './type';

enum API {
  ALLROLE_URL = '/acl/role',
  ADD_URL = '/acl/role/save',
  UPDATE_URL = '/acl/role/update',
  ALLPERMISSION_URL = '/acl/permission/toAssigin',
  SETPERMISSION_URL = '/acl/permission/doAssigin',
  REMOVEROLE_URL = '/acl/role/remove',
}

export const reqAllRoleList = (page: Number, limit: Number, rolename: String) =>
  request.get<RoleResponseData>(API.ALLROLE_URL + `/${page}/${limit}?rolename=${rolename}`);

export const reqAddOrUpdate = (data: RoleData) => {
  if (data.id) {
    return request.post<any>(API.UPDATE_URL, data);
  } else {
    return request.post<any>(API.ADD_URL, data);
  }
};

export const reqAllMenuList = (roleId: Number | String) => request.get<MenuResponseData, any>(API.ALLPERMISSION_URL + `/${roleId}`);

export const reqSetPermission = (roleId: Number | String, permissionId: Number[]) =>
  request.post<MenuResponseData, any>(API.SETPERMISSION_URL + `/roleId=${roleId}&permission=${permissionId}`);

export const reqRemoveRole = (roleId: Number | String) => request.delete<MenuResponseData, any>(API.REMOVEROLE_URL + `/${roleId}`);
