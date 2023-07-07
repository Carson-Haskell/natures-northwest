import React from "react";
import { useLocation } from "react-router-dom";
import TodoQuery from "./TodoQuery";
import { TodoContext } from "./TodoProvider";

export default function TodoItem({ completed, title, id }) {
  const { handleDelete, handleComplete } = React.useContext(TodoContext);

  const location = useLocation().pathname;

  let todoItem;

  // When accessing todos from '/todos' query is needed to enable search
  if (location.includes(`users`)) {
    todoItem = <li className={completed ? "strike-through" : ""}>{title}</li>;
  } else {
    // When accessing todos from '/users' query is not needed
    todoItem = <TodoQuery title={title} completed={completed} />;
  }

  return (
    <div className="todos">
      {todoItem}
      <div className="todo-btn-group">
        <button className="todo-btn btn-outline" onClick={() => handleComplete(id)}>Complete</button>

        <button className="todo-btn btn-outline" id="delete" onClick={() => handleDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
