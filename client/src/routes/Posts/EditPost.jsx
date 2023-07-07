import { redirect, useActionData, useLoaderData } from "react-router-dom";
import { getUsers } from "../../api/users";
import { getPost, updatePost } from "../../api/posts";
import PostForm from "../../components/PostForm";
import { postFormValidator } from "../../components/NewEntryForm";

function EditPost() {
  const { users, post } = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm users={users} defaultValues={post} isEdit={true} errors={errors} />
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost({ signal }, postId);
  const users = getUsers({ signal });

  return { post: await post, users: await users };
}

async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errors = postFormValidator({ title, body, userId });
  if(Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await updatePost(
    postId,
    { title, body, userId },
    { signal: request.signal }
  );

  return redirect(`/posts/${post.id}`);
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};
