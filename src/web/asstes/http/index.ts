/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-04 09:08:43
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-11 22:43:35
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
// import { WorkSpaceData } from './setHeader'
import { settingHttpHeaders } from './useHttp';
// import { logoutFun } from '../utils/login';
import whiteList from './whiteList';

const isDev = process.env.NODE_ENV === 'development';

const ContentTypeMenu = {
  json: 'application/json',
  formData: 'application/x-www-form-urlencoded'
};

const reLogin = () => {
  message.error('登录状态已过期，请重新登录！');
  setTimeout(() => {
    // logoutFun();
  }, 1000);
};

const Http = axios.create({
  baseURL: isDev?  'http://localhost:3004/tianshan' : '/tianshan', // api请求的baseURL
  timeout: 600000,
  headers: {
    'Content-Type': ContentTypeMenu.json
    // 'Authorization':  `Bearer ${WorkSpaceData.jwt}`
  },
  maxContentLength: 2000
});

const formDataHttp = axios.create({
  baseURL: '/', // api请求的baseURL
  timeout: 600000,
  withCredentials: true, // 允许跨域 cookie
  headers: {
    'Content-Type': ContentTypeMenu.json
    // 'Authorization':  `Bearer ${WorkSpaceData.jwt}`
  },
  maxContentLength: 2000
});

// 请求拦截器
Http.interceptors.request.use(
  (config: any) => settingHttpHeaders(config),
  (err: AxiosRequestConfig) => Promise.reject(err)
);
Http.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (response: AxiosResponse) => {
    if (response.status === 200) {
      // 放行 白名单 域名
      if (response?.request?.responseURL) {
        const url = new URL(response?.request?.responseURL as string);
        if (whiteList.includes(url.origin)) {
          return response.data;
        }
      }
      if (response.data.code !== 200 && response.data.code !== '200') {
        message.error(response.data.message);
      }
      if (response.data.code === 401) {
        reLogin();
      }
      if (response.data.code === 200 || response.data.code === '200') {
        return response.data;
      }
    }
  },
  (err: { response: AxiosResponse }) => {
    // message.error(err.response.)
    console.log(err, 'err');
    // if (err.response.status === 401) {
    //     // window.eventCenterForAppalgorithm.dispatch(params)
    // } else {
    //     message.error('服务器错误，错误代码500！')
    // }
    return err;
  }
);

export { Http, formDataHttp };
