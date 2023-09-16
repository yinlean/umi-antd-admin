import { request } from '@umijs/max';
import queryString from 'query-string';

export const login = (data) => {
  return request('/api/alert-hub/login/user', {
    method: 'POST',
    data,
  });
};

// 用户
export const getUserList = (data = {}) => {
  return request('/api/alert-hub/users/user', {
    method: 'GET',
    data,
  });
};

export const createUser = (data) => {
  return request('/api/alert-hub/users/user', {
    method: 'PUT',
    data,
  });
};
export const updateUser = (data) => {
  return request('/api/alert-hub/users/user', {
    method: 'POST',
    data,
  });
};
export const deleteUser = (data) => {
  return request('/api/alert-hub/users/user', {
    method: 'DELETE',
    data,
  });
};

export const getUserInfo = (data) => {
  return request('/api/alert-hub/users/info', {
    method: 'GET',
    data,
  });
};

// 团队
export const getBizUserInfo = (data) => {
  return request(
    `/api/alert-hub/biz/bizUserInfo?${queryString.stringify(data)}`,
    {
      method: 'GET',
      data,
    },
  );
};

export const getBizInfo = (data) => {
  return request('/api/alert-hub/biz/info', {
    method: 'GET',
    data,
  });
};
export const deleteBiz = (data) => {
  return request('/api/alert-hub/biz/biz', {
    method: 'DELETE',
    data,
  });
};
export const updateBiz = (data) => {
  return request('/api/alert-hub/biz/biz', {
    method: 'POST',
    data,
  });
};
export const createBiz = (data) => {
  return request('/api/alert-hub/biz/biz', {
    method: 'PUT',
    data,
  });
};
export const getBizTeamInfo = (data) => {
  return request(`/api/alert-hub/biz/biz/info?${queryString.stringify(data)}`, {
    method: 'GET',
    // data,
  });
};
// 添加组内成员
export const addTeamUser = (data) => {
  return request(`/api/alert-hub/biz/biz/user`, {
    method: 'PUT',
    data,
  });
};
// 删除组内成员
export const deleteTeamUser = (data) => {
  return request(`/api/alert-hub/biz/biz/user`, {
    method: 'DELETE',
    data,
  });
};
