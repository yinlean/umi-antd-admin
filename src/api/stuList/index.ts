import { request } from '@umijs/max';

export const getStuList = () => {
  return request('/app/getStuList', {
    method: 'GET',
  });
};
