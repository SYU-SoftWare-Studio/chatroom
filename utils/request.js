/* eslint-disable */

import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default service;
