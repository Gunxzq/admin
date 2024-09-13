import router from '../src/router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import useUserStore from './store/modules/user';
import pinia from './store/index';
import setting from './setting';
const UserStore = useUserStore(pinia);

router.beforeEach((to, from, next) => {
  document.title = setting.title + ':' + to.meta.title;
  nprogress.start();
  const token = UserStore.token;
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    if (to.path == '/login') {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.path,
        },
      });
    }
  }
});

router.afterEach((to, from, next) => {
  nprogress.done();
});
