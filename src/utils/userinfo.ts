import { userInfo } from '../api/user/type';

export const SET_USERINFO = (userInfodata: userInfo) => {
  localStorage.setItem('USERINFO', JSON.stringify(userInfodata));
};

export const GET_USERINFO = () => {
  return JSON.parse(localStorage.getItem('USERINFO'));
};

export const REMOVE_USERINFO = () => {
  localStorage.removeItem('USERINFO');
};
