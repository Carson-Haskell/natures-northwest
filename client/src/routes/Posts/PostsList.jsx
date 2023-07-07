import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import { getPosts } from "../../api/posts";
import PageBanner from "../../components/PageBanner";
import SearchForm from "../../components/SearchForm";
import React from "react";
import Animated from "../../components/Animated";

function PostsList() {
  const [showSearch, setShowSearch] = React.useState(false);
  const { posts } = useLoaderData();

  const toggleSearchBar = () => setShowSearch(!showSearch);

  return (
    <>
      <PageBanner
        pageTitle="posts"
        toggleSearch={toggleSearchBar}
        showSearch={showSearch}
      />
      {showSearch && (
        <Animated>
          <SearchForm />
        </Animated>
      )}
      <br />

      {posts.length === 0 && <p>That post does not exist!</p>}
      <div className="card-grid">
        {posts.slice(0).reverse().map(post => (
          <Card
            key={post.id}
            id={post.id}
            header={post.title}
            route={`${post.id}`}
          >
            <div className="card-preview-text">{post.body}</div>
          </Card>
        ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query" || "");

  const posts = getPosts({ signal, params: { query } });

  return {
    searchParams: { query },
    posts: await posts,
  };
}

export const postsListRoute = {
  loader,
  element: <PostsList />,
};
