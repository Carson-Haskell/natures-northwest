import Animated from "../../components/Animated";
import PostForm from "../../components/PostForm";
import { addPost } from "../../api/posts";
import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getUsers } from "../../api/users";
import { postFormValidator } from "../../components/NewEntryForm";

function NewPost() {
  const users = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <Animated transitionSpeed="500ms">
        <PostForm users={users} errors={errors} />
      </Animated>
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errors = postFormValidator({ title, body, userId });
  if(Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await addPost({ title, body, userId }, request.signal);

  return redirect(`/posts/${post.id}`);
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};
