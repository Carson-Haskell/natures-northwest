import { useLoaderData } from "react-router-dom";
import Card from "../../components/Card";
import { getUsers } from "../../api/users";
import SearchForm from "../../components/SearchForm";
import PageBanner from "../../components/PageBanner";
import React from "react";
import Animated from "../../components/Animated";

function UsersList() {
  const [showSearch, setShowSearch] = React.useState(false);
  const { users } = useLoaderData();

  const toggleSearchBar = () => setShowSearch(!showSearch);

  return (
    <>
      <PageBanner
        pageTitle="users"
        toggleSearch={toggleSearchBar}
        showSearch={showSearch}
      />
      {showSearch && (
        <Animated>
          <SearchForm />
        </Animated>
      )}
      <br />

      {users.length === 0 && <p>That user does not exist!</p>}
      <div className="card-grid">
        {users
          .slice(0)
          .reverse()
          .map(user => (
            <Card
              key={user.id}
              id={user.id}
              header={user.name}
              route={user.id.toString()}
            >
              <div>{user.company.name}</div>
              <div>{user.website}</div>
              <div>{user.email}</div>
            </Card>
          ))}
      </div>
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";

  const users = getUsers({ signal, params: { query } });

  return {
    searchParams: { query },
    users: await users,
  };
}

export const usersListRoute = {
  loader,
  element: <UsersList />,
};
