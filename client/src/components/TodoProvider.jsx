import React from "react";
import { completeTodo, deleteTodo } from "../api/todos";

export const TodoContext = React.createContext();

export default function TodoProvider({ children, todoData }) {
  const [todos, setTodos] = React.useState(todoData);

  function handleDelete(todoId) {
    deleteTodo(todoId);
    const nextTodos = todos.filter(todo => todo.id !== todoId);
    setTodos(nextTodos);
  }

  function handleComplete(todoId) {
    const nextTodos = todos.map(todo => {
      if (todo.id === todoId) {
        completeTodo(todoId, !todo.completed);
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(nextTodos);
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleDelete,
        handleComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
