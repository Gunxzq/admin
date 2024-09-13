import axios from 'axios';
import { ElMessage } from 'element-plus';
import useUserStore from '../store/modules/user';
// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 5000,
});
// 添加请求与响应拦截器
request.interceptors.request.use(config => {
  // config配置对象，headers请求头可携带公共参数
  const UserStore = useUserStore();
  if (UserStore.token) config.headers.token = UserStore.token;
  return config;
});

request.interceptors.response.use(
  reponse => {
    // 处理数据
    // console.log(reponse.data);
    return reponse.data;
  },
  error => {
    let message = '';
    const status = error.response.status;
    switch (status) {
      case 401:
        message = 'token过期';
        break;
      case 403:
        message = '无权访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器出现问题';
        break;
      default:
        message = '网络问题';
        break;
    }
    // 提示错误信息
    ElMessage({
      type: 'error',
      message,
    });

    return Promise.reject(error);
  },
);
export default request;
