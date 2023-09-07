// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import type { RequestConfig } from '@umijs/max';
import Cat from './assets/cat.jpeg';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

export const layout = () => {
  return {
    logo: Cat,
    title: '数据管理系统',
    siderWidth: 180,
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  // baseURL: 'http://www.baidu.com',
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  // 请求拦截
  requestInterceptors: [
    (options) => {
      console.log('===>', options);
      return options;
    },
  ],
  // 响应拦截
  responseInterceptors: [
    (respones) => {
      console.log('res===>', respones);
      return respones.data;
    },
  ],
};
