import { redirect, useActionData, useLocation } from "react-router-dom";
import Animated from "../../components/Animated";
import {
  NewEntryForm,
  FormEntryField,
  todoFormValidator,
} from "../../components/NewEntryForm";
import { postTodo } from "../../api/todos";

function NewTodo() {
  const route = useLocation().pathname;
  const errors = useActionData();

  return (
    <>
      <h1 className="page-title">New Todo</h1>
      <Animated transitionSpeed="500ms">
        <NewEntryForm actionRoute={route}>
          <FormEntryField
            type="text"
            label="title"
            errorMessage={errors?.title}
          />
        </NewEntryForm>
      </Animated>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");

  const errors = todoFormValidator({ title });
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  await postTodo({ title, completed: false }, request.signal);

  return redirect("/todos");
}

export const newTodoRoute = {
  action,
  element: <NewTodo />,
};
