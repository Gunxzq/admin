export interface loginForm {
  username: string;
  password: string;
}

interface dataType {
  token: string;
}

export interface loginResponseData {
  code: number;
  data: dataType;
}

export interface userInfo {
  userId: number;
  avater: string;
  username: string;
  password: string;
  desc: string;
  roles: string[];
  buttons: string[];
  routes: string[];
  token: string;
  // path:string
}

interface user {
  checkuser: userInfo;
}

export interface userResponseData {
  code: number;
  data: user;
}
