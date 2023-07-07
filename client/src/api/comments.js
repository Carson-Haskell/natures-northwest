import { baseApi } from "./base";

export function getComments(options, postId) {
  return baseApi
    .get(`comments/?postId=${postId}`, options)
    .then(res => res.data);
}
