import React from "react";
import { useLoaderData } from "react-router-dom";

export default function TodoQuery({ title, completed }) {
  const {
    searchParams: { query },
  } = useLoaderData();

  const queryCheck = query.toLowerCase();
  const titleCheck = title.toLowerCase();

  const words = title.split(" ");

  if (titleCheck.includes(queryCheck)) {
    return (
      <li className={completed ? "strike-through" : ""}>
        {words.map((word, index) => {
          return (
            <React.Fragment key={index}>
              <span
                className={
                  word.toLowerCase() === queryCheck ? "highlighted" : ""
                }
              >
                {word}
              </span>{" "}
            </React.Fragment>
          );
        })}
      </li>
    );
  } else {
    return <li className={completed ? "strike-through" : ""}>{title}</li>;
  }
}
