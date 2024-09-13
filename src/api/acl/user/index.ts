import request from '@/utils/request';
import { UserResponseData, user, roleReponseData, SetRoleData } from './type';

enum API {
  ALLUSER_URL = '/acl/user',
  ADD_URL = '/acl/user/save',
  UPDATE_URL = '/acl/user/update',
  ALLROLE_URL = '/acl/user/get/toAssign',
  SETROLE_URL = '/acl/user/doAssignRole',
  DELETEUSER_URL = '/acl/user/remove',
  DELETEALLUSER_URL = '/acl/user/batchRemove',
}

export const reqUserInfo = (page: Number, limit: Number, username: String) => request.get<UserResponseData>(API.ALLUSER_URL + `/${page}/${limit}?username=${username}`);

export const reqAddOrUpdate = (data: user) => {
  if (data.id) {
    request.post<any>(API.UPDATE_URL, data);
  } else {
    request.post<any>(API.ADD_URL, data);
  }
};

export const reqAllRole = (adminId: Number | String) => request.get<roleReponseData>(API.ALLROLE_URL + `/${adminId}`);

export const reqSetUserRole = (data: SetRoleData) => request.post<roleReponseData>(API.SETROLE_URL, data);

export const reqDelete = (id: Number | String) => request.delete<any>(API.DELETEUSER_URL + `/${id}`);

export const reqDeleteAll = (data: Number[] | String[]) => request.delete<any>(API.DELETEALLUSER_URL, data);
