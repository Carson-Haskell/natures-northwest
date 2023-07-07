import React from "react";
import { Form, useLoaderData } from "react-router-dom";

export default function SearchForm() {
  const {
    searchParams: { query },
  } = useLoaderData();

  const queryRef = React.useRef();

  React.useEffect(() => {
    queryRef.current.value = query;
    queryRef.current.focus();
  }, [query]);

  return (
    <Form className="form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="query">Search</label>
          <input type="text" name="query" id="query" ref={queryRef} />
        </div>
        <button className="btn">Search</button>
      </div>
    </Form>
  );
}
