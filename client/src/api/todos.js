import { baseApi } from "./base";

export function getTodos(options) {
  if (options.params.query) {
    return baseApi
      .get(`todos?q=${options.params.query}`, options)
      .then(res => res.data);
  }

  return baseApi.get("todos", options).then(res => res.data);
}

export function postTodo(data, options) {
  return baseApi.post("todos", data, options).then(res => res.data);
}

export function deleteTodo(todoId, options) {
  baseApi.delete(`todos/${todoId}`, options);
}

export function completeTodo(todoId, completed, options) {
  baseApi.patch(`todos/${todoId}`, { completed }, options);
}
