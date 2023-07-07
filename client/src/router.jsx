import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import { newTodoRoute } from "./routes/Todos/NewTodo";
import { newUserRoute } from "./routes/Users/NewUser";
import { newPostRoute } from "./routes/Posts/NewPost";
import { postsListRoute } from "./routes/Posts/PostsList";
import { usersListRoute } from "./routes/Users/UsersList";
import { todosListRoute } from "./routes/Todos/TodosList";
import { postRoute } from "./routes/Posts/Post";
import { userRoute } from "./routes/Users/User";
import { editPostRoute } from "./routes/Posts/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              { index: true, ...postsListRoute },
              {
                path: ":postId",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...editPostRoute },
                ],
              },
              { path: "new", ...newPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...usersListRoute },
              { path: ":userId", ...userRoute },
              { path: "new", ...newUserRoute },
            ],
          },
          {
            path: "todos",
            children: [
              { index: true, ...todosListRoute },
              { path: "new", ...newTodoRoute },
            ],
          },
          { path: "*", element: <h1>404 - Page Not Found</h1> },
        ],
      },
    ],
  },
]);
