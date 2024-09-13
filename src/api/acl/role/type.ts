export interface ResponseData {
  code: Number;
  message: String;
  ok: boolean;
}

export interface RoleData {
  id?: Number | String;
  createTime?: String;
  updateTime?: String;
  roleName: String;
  remark?: null;
}

export type record = RoleData[];

export interface RoleResponseData extends ResponseData {
  data: {
    record: record;
    total: Number;
    size: Number;
    current: Number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: String;
    maxLimit: Number;
    searchCount: boolean;
    pages: Number;
  };
}

export type MenuList = MenuData[];

export interface MenuData {
  id: number | String;
  createTime?: String;
  updateTime?: String;
  pid: Number;
  name: String;
  code: String;
  toCode: String;
  type: Number;
  status: null;
  level: Number;
  children?: MenuData;
  select: Boolean;
}

export interface MenuResponseData extends ResponseData {
  data: MenuList;
}

// export interface SetRoleData {
//   roleIdList: (Number | String)[];
//   userId: Number | String;
// }
