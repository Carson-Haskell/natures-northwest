import TodoItem from "./TodoItem";
import { TodoContext } from "./TodoProvider";
import React from "react";

export default function Todos() {
  const [filter, setFilter] = React.useState(false);
  const { todos } = React.useContext(TodoContext);

  let filteredTodos = todos;
  if (filter) {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  return (
    <>
      <div className="filter">
        <button className="todo-btn" onClick={() => setFilter(!filter)}>
          {filter ? "Show completed" : "Hide completed"}
        </button>
      </div>
      <ul>
        {filteredTodos
          .slice(0)
          .reverse()
          .map(todo => (
            <TodoItem
              key={todo.id}
              completed={todo.completed}
              title={todo.title}
              id={todo.id}
            />
          ))}
      </ul>
    </>
  );
}
