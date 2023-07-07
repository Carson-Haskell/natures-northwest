import { baseApi } from './base';

export function getUsers(options) {
  if (options.params?.query) {
    return baseApi
      .get(`users?q=${options.params.query}`, options)
      .then((res) => res.data);
  }

  return baseApi.get('users', options).then((res) => res.data);
}

export function getUser(options, userId) {
  return baseApi.get(`users/${userId}`, options).then((res) => res.data);
}

export function addUser(data, options) {
  return baseApi.post('users', data, options).then((res) => res.data);
}
