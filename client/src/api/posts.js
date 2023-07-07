import { baseApi } from "./base";

export function getPosts(options) {
  if (options.params.query) {
    return baseApi
      .get(`posts?q=${options.params.query}`, options)
      .then(res => res.data);
  }

  return baseApi.get("posts", options).then(res => res.data);
}

export function getPost(options, postId) {
  return baseApi.get(`posts/${postId}`, options).then(res => res.data);
}

export function addPost(data, options) {
  return baseApi.post("posts", data, options).then(res => res.data);
}

export function deletePost(postId, options) {
  baseApi.delete(`posts/${postId}`, options);
}

export function updatePost(postId, data, options) {
  return baseApi.put(`posts/${postId}`, data, options).then(res => res.data);
}
