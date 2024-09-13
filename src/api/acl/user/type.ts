export interface ResponseData {
  code: Number;
  message: String;
  ok: boolean;
}

export interface user {
  id?: Number | String;
  createTime?: String;
  updateTime?: String;
  username: String;
  password: String;
  name: String;
  phone?: String;
  roleName?: String;
}

export type record = user[];

export interface UserResponseData extends ResponseData {
  data: {
    record: record;
    total: Number;
    size: Number;
    current: Number;
    pages: Number;
  };
}

export interface roleData {
  id?: Number | String;
  createTime?: String;
  updateTime?: String;
  roleName: String;
  remark: Boolean;
}

export type AllRole = roleData[];

export interface roleReponseData extends ResponseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}

export interface SetRoleData {
  roleIdList: (Number | String)[];
  userId: Number | String;
}
