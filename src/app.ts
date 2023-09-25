// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import queryString from 'query-string';
import Cat from './assets/cat.jpeg';
export async function getInitialState(): Promise<{
  name: string;
  avatar: string;
  userName: string;
}> {
  return { name: 'Admin', avatar: './assets/cat.jpeg', userName: '张三' };
}

export const layout = () => {
  return {
    logo: Cat,
    title: '日志告警中心',
    siderWidth: 180,
    menu: {
      locale: false,
    },
    logout: () => {
      localStorage.removeItem('token');
      history.replace('/login');
    },
  };
};

export const request: RequestConfig = {
  timeout: 1000000,
  headers: { 'Access-Control-Allow-Origin': '*' },
  paramsSerializer(params) {
    return queryString.stringify(params);
  },
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  // 请求拦截
  requestInterceptors: [
    (options) => {
      const token = localStorage.getItem('token');
      options.headers.Authorization = token;
      return options;
    },
  ],
  // 响应拦截
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    // (response) => {
    //   // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
    //   // do something
    //   console.log('response =1111===========', response);

    //   return response ?? 'success';
    // },
    // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    [
      (response) => {
        return {
          ...response,
          data: { ...response.data, code: response.status },
        };
      },
      (error) => {
        message.error(error?.message ?? '接口错误');
        return Promise.reject(error);
      },
    ],
  ],
};
