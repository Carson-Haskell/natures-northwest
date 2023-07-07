import { FormEntryField, NewEntryForm } from "./NewEntryForm";

export default function PostForm({
  users,
  isEdit = false,
  defaultValues = {},
  errors
}) {
  return (
    <NewEntryForm isEdit={isEdit}>
      <FormEntryField
        type="text"
        label="title"
        defaultValue={defaultValues.title}
        errorMessage={errors?.title}
      >
        <div className="form-group">
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </FormEntryField>
      <FormEntryField
        type="textarea"
        label="body"
        defaultValue={defaultValues.body}
        errorMessage={errors?.body}
      />
    </NewEntryForm>
  );
}
