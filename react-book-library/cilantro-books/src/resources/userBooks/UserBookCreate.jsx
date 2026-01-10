import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  BooleanInput,
  required,
} from 'react-admin';

export const UserBookCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="username" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="book_id" reference="books">
        <SelectInput optionText="title" validate={[required()]} />
      </ReferenceInput>
      <ReferenceInput source="status_id" reference="reading_statuses">
        <SelectInput optionText="status_name" validate={[required()]} />
      </ReferenceInput>
      <DateInput source="date_started" />
      <DateInput source="date_finished" />
      <BooleanInput source="is_favorite" label="Mark as Favorite" />
    </SimpleForm>
  </Create>
);