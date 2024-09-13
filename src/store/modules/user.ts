// user相关store
import { defineStore } from 'pinia';
import { reqLogin, reqUserInfo } from '@/api/user/index';
import type { loginForm, loginResponseData, userResponseData } from '@/api/user/type';
import { UserState } from './types/type';
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token';
import { constantRoutes, anyRoutes, asyncRoutes } from '@/router/routes';
import router from '@/router';

// 过滤异步路由
function filterAsyncRoute(asyncRoute: Array<any>, routers: Array<any>) {
  return asyncRoute.filter((item: any) => {
    if (routers.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routers);
      }
      return true;
    }
  });
}

// 深拷贝
function deepClone(source) {
  if (typeof source !== 'object' || source == null) {
    return source;
  }
  const target = Array.isArray(source) ? [] : {};
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

const useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      state: '',
      // 筛选路由
      menuRoutes: constantRoutes,
      buttons: [],
      username: '',
      avater: '',
    };
  },
  actions: {
    async userLogin(data: loginForm) {
      const result: loginResponseData = await reqLogin(data);

      if (result.code == 200) {
        this.token = result.data.token;
        SET_TOKEN(result.data.token as string);
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    async getUerInfo() {
      const result: userResponseData = await reqUserInfo();
      if (result.code == 200) {
        this.username = result.data.checkuser.username;
        this.avater = result.data.checkuser.avater;
        // 过滤路由
        let userAsycnRoute = filterAsyncRoute(deepClone(asyncRoutes), result.data.checkuser.routes);
        this.menuRoutes = [...constantRoutes, ...userAsycnRoute, ...anyRoutes];
        // 动态注册路由
        [...userAsycnRoute].forEach(item => {
          router.addRoute(item);
        });
        // 过滤按钮
        this.buttons = result.data.checkuser.buttons;
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    userLoginout() {
      REMOVE_TOKEN();
      this.username = null;
      this.token = '';
      this.menuRoutes = '';
    },
  },
  gettters: {},
});

export default useUserStore;
