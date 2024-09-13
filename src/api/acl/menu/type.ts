export interface ResponseData {
  code: Number;
  message: String;
  ok: boolean;
}

export type permissionList = Permission[];

export interface Permission {
  id?: number | String;
  createTime?: String;
  updateTime?: String;
  pid: Number;
  name: String;
  code: String;
  toCode: String;
  type: Number;
  status: null;
  level: Number;
  children?: permissionList;
  select: Boolean;
}

export interface PermissionResponseData extends ResponseData {
  data: permissionList;
}

export interface MenuParams {
  id?: Number | String;
  code: String;
  level: Number;
  name: String;
  pid: Number;
}
