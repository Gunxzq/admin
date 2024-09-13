import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElmentPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'virtual:svg-icons-register';
import zhCn from 'element-plus/dist/locale/zh-cn.min.js';
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';
import globalComponents from '@/components';
import pinia from '@/store';
import './permission';

const app = createApp(App);

app.use(ElmentPlus, {
  locale: zhCn,
});

app.use(globalComponents);
app.use(router);
app.use(pinia);
// 自定义指令
import { isHasButton } from './directive/has';
isHasButton(app);
app.mount('#app');
