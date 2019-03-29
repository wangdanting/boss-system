import axios from 'axios';
import { message } from 'antd';
import Storage from './storage';
import PubSub from './pubsubmsg';
import { getCookie } from './util';

export const urlPrefix = '/api/bp';
const errorMsg = '网络请求超时，请重新登录!';

const request = async (url, options = {}) => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const defaultOptions = {
    headers: {
      Authorization: Storage.session.get('Authorization'),
      mxsrf: getCookie('xxsrf')
    },
    timeout: 30000,
    cancelToken: source.token
  };

  // 按照条件覆盖掉默认header
  const newOptions = options;
  newOptions.headers = {
    ...defaultOptions.headers,
    ...options.headers
  };

  const configs = { ...defaultOptions, ...newOptions };
  const newUrl = `${options.urlPrefix || urlPrefix}${url}`;
  if (!options.noLoading) {
    PubSub.publish('loading', true);
  }

  return axios(newUrl, configs);
};

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    PubSub.publish('loading', false);
    return response.data;
  },
  error => {
    // 对响应错误做点什么
    const { response } = error;
    if (response) {
      const { status, data } = response;
      const msg = data.message || errorMsg;
      if (status === 400) {
        const { code } = data;
        if ([10002, 10019, 10020].includes(code)) {
          message.error('登陆过期，请重新登陆！');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        } else {
          message.error(msg);
        }
      } else if (status === 404) {
        // window.location.href = '/404';
      } else {
        message.error(msg);
      }
    }
    PubSub.publish('loading', false);

    return Promise.reject(error);
  }
);

export default request;
