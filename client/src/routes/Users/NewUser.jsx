import { redirect, useActionData } from "react-router-dom";
import { addUser } from "../../api/users";
import Animated from "../../components/Animated";
import {
  NewEntryForm,
  FormEntryField,
  userFormValidator,
} from "../../components/NewEntryForm";

function NewUser() {
  const errors = useActionData();
  console.log(errors);

  return (
    <>
      <h1 className="page-title">New User</h1>
      <Animated transitionSpeed="700ms">
        <NewEntryForm>
          <FormEntryField type="text" label="name" errorMessage={errors?.name} />
          <FormEntryField
            type="email"
            label="email"
            errorMessage={errors?.email}
          />
          <FormEntryField
            type="text"
            label="website"
            errorMessage={errors?.website}
          />
          <FormEntryField
            type="text"
            label="company name"
            errorMessage={errors?.companyName}
          />
        </NewEntryForm>
      </Animated>
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const website = formData.get("website");
  const companyName = formData.get("company name");

  const errors = userFormValidator({ name, email, website, companyName });
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  await addUser(
    {
      name,
      email,
      website,
      company: { name: companyName },
      id: crypto.randomUUID(),
    },
    request.signal
  );

  return redirect("/users");
}

export const newUserRoute = {
  action,
  element: <NewUser />,
};
