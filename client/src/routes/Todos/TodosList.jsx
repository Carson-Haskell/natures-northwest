import { useLoaderData } from "react-router-dom";
import { getTodos } from "../../api/todos";
import Todos from "../../components/Todos";
import SearchForm from "../../components/SearchForm";
import PageBanner from "../../components/PageBanner";
import TodoProvider from "../../components/TodoProvider";
import React from "react";
import Animated from "../../components/Animated";

function TodosList() {
  const [showSearch, setShowSearch] = React.useState(false);
  const { fetchedTodos } = useLoaderData();

  const toggleSearchBar = () => setShowSearch(!showSearch);

  return (
    <>
      <PageBanner
        pageTitle="todos"
        toggleSearch={toggleSearchBar}
        showSearch={showSearch}
      />
      {showSearch && (
        <Animated>
          <SearchForm />
        </Animated>
      )}

      {fetchedTodos.length === 0 ? (
        <p>That todo does not exist!</p>
      ) : (
        <TodoProvider todoData={fetchedTodos}>
          <Todos />
        </TodoProvider>
      )}
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";

  const todos = getTodos({ signal, params: { query } });
  return {
    searchParams: { query },
    fetchedTodos: await todos,
  };
}

async function action({ request }) {
  const formData = await request.formData();
  const id = formData.get("todoId");

  await deleteTodo(id, request.signal);
}

export const todosListRoute = {
  loader,
  action,
  element: <TodosList />,
};
