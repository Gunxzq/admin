import Pinia from '@/store';
import useUserStore from '@/store/modules/user';
// 非组件模块，需要引入pinia
let userstore = useUserStore(Pinia);
export const isHasButton = (app: any) => {
  app.directive('has', {
    // hook使用指令的dom
    mounted(el: any, options: any) {
      console.log(el);
      if (!userstore.buttons.includes(options.value)) {
        // 移除dom
        el.parentNode.removeChild(el);
      }
    },
  });
};
