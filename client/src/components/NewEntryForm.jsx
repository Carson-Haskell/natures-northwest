import { Form, Link, useActionData, useNavigation } from "react-router-dom";

export function NewEntryForm({ actionRoute, children, isEdit }) {
  const { state } = useNavigation();
  const isSubmitting = state === "submitting" || state === "loading";
  const errorMessage = useActionData();

  const buttonText = isEdit ? "Save" : "Create";

  return (
    <>
      {isSubmitting && <h2>Submitting...</h2>}
      <Form className="form" method="post" action={actionRoute}>
        {children}
        <div className="form-btn-row form-row">
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Loading" : buttonText}
          </button>
        </div>
      </Form>
    </>
  );
}

export function FormEntryField({
  type = "text",
  label = "title",
  children = null,
  defaultValue = "",
  errorMessage,
}) {
  const displayLabel = capitalizeLabel(label);

  if (type === "textarea")
    return (
      <div className="form-row">
        <div className="form-group">
          <label htmlFor={label}>{displayLabel}</label>
          <textarea name={label} id={label} defaultValue={defaultValue} />
          {errorMessage != null && (
            <div className="error-message">{errorMessage}</div>
          )}
        </div>
      </div>
    );

  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor={label}>{displayLabel}</label>
        <input
          type={type}
          name={label}
          id={label}
          defaultValue={defaultValue}
        />
        <div className="error-message">{errorMessage}</div>
      </div>
      {children}
    </div>
  );
}

function capitalizeLabel(label) {
  if (!label.includes(" ")) return label[0].toUpperCase() + label.slice(1);

  const splitLabel = label.split(" ");
  const word1 = splitLabel[0];
  const word2 = splitLabel[1];

  return (
    word1[0].toUpperCase() +
    word1.slice(1) +
    " " +
    (word2[0].toUpperCase() + word2.slice(1))
  );
}

export function postFormValidator({ title, body, userId }) {
  const errors = {};

  if (title === "") errors.title = "Required";

  if (body === "") errors.body = "Required";

  if (userId === "") errors.userId = "Required";

  return errors;
}

export function userFormValidator({ name, email, website, companyName }) {
  const errors = {};

  if (name === "") errors.name = "Required";

  if (email === "") errors.email = "Required";

  if (website === "") errors.website = "Required";

  if (companyName === "") errors.companyName = "Required";

  return errors;
}

export function todoFormValidator({ title }) {
  const errors = {};

  if (title === "") errors.title = "Required";

  return errors;
}

