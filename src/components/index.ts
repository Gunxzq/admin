import SvgIcon from '@/components/SvgIcon/index.vue';
import Pagination from '@/components/Pagination/index.vue';
import Category from '@/components/Category/index.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const allGlobalComponents = { SvgIcon, Pagination, Category };

export default {
  install(app) {
    Object.keys(allGlobalComponents).forEach(key => {
      app.component(key, allGlobalComponents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
