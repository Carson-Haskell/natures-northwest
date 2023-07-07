import { useLoaderData, Link, useNavigate } from "react-router-dom";
import CommentList from "../../components/CommentList";
import { getPost, deletePost } from "../../api/posts";
import { getComments } from "../../api/comments";
import { getUser } from "../../api/users";
import Animated from "../../components/Animated";

function Post() {
  const { post, comments, user } = useLoaderData();
  const navigate = useNavigate();

  function handleDelete() {
    deletePost(post.id);
    setTimeout(() => {
      navigate("/posts");
    }, 100);
  }

  return (
    <>
      <h1 className="page-title">
        <span className="heading">{post.title}</span>
        <div className="title-btns">
          <button className="btn btn-outline" id="delete" onClick={handleDelete}>
            Delete
          </button>
          <Link to="edit" className="btn btn-outline">
            Edit
          </Link>
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        <Link to={`/users/${user.id}`}> By: {user.name} </Link>
      </span>
      <div>{post.body}</div>

      <h3 className="mt-4 mb-2">Comments</h3>
      {comments.length !== 0 ? (
        <Animated transitionSpeed="1300ms">
          <CommentList comments={comments} />
        </Animated>
      ) : (
        <p>Post has no comments</p>
      )}
    </>
  );
}

async function loader({ params: { postId }, request: { signal } }) {
  const comments = getComments({ signal }, postId);
  const post = await getPost({ signal }, postId);
  const user = getUser({ signal }, post.userId);

  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};
