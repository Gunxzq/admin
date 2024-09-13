import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoutes, asyncRoutes, anyRoutes } from './routes';
let router = createRouter({
  history: createWebHashHistory(),
  // routes: constantRoutes,
  routes: [...constantRoutes, ...anyRoutes],
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});

export default router;
