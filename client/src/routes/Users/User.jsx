import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Todos from '../../components/Todos';
import { getUser } from '../../api/users';
import { getPosts } from '../../api/posts';
import { getTodos } from '../../api/todos';
import TodoProvider from '../../components/TodoProvider';

function User() {
  const { user, posts, todos } = useLoaderData();

  return (
    <>
      <h1 className="page-title">
        {user.name}
        <div className="single-title-btn">
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
        </div>
      </h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>

      {posts.length !== 0 ? (
        <div className="card-grid">
          {posts.map((post) => (
            <Card
              key={post.id}
              header={post.title}
              route={`/posts/${post.id.toString()}`}
            >
              <div className="card-preview-text">{post.body}</div>
            </Card>
          ))}
        </div>
      ) : (
        <p>User has not made any posts!</p>
      )}
      <h3 className="mt-4 mb-2">Todos</h3>
      {todos.length !== 0 ? (
        <TodoProvider todoData={todos}>
          <Todos />
        </TodoProvider>
      ) : (
        <p>User has not made any todos!</p>
      )}
    </>
  );
}

async function loader({ params: { userId }, request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get('query') || '';

  const user = getUser({ signal }, userId);
  const posts = getPosts({ signal, params: { userId } });
  const todos = getTodos({ signal, params: { userId } });

  return { user: await user, posts: await posts, todos: await todos, query };
}

export const userRoute = {
  loader,
  element: <User />,
};
