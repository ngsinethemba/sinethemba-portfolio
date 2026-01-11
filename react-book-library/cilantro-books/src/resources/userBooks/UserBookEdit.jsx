import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  BooleanInput,
  required,
} from 'react-admin';
import { Toolbar, SaveButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';


export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <BackButton label="Cancel" variant="outlined" color="inherit" sx={{ ml: 2 }} />
  </Toolbar>
);

export const UserBookEdit = () => (
  <Edit>
    <SimpleForm toolbar={<CustomToolbar />}>
      <ReferenceInput source="user_id" reference="users">
        <SelectInput optionText="username" validate={[required()]} disabled />
      </ReferenceInput>
      <ReferenceInput source="book_id" reference="books">
        <SelectInput optionText="title" validate={[required()]} disabled />
      </ReferenceInput>
      <ReferenceInput source="status_id" reference="reading_statuses">
        <SelectInput optionText="status_name" validate={[required()]} />
      </ReferenceInput>
      <DateInput source="date_started" />
      <DateInput source="date_finished" />
      <BooleanInput source="is_favorite" label="Mark as Favorite" />
    </SimpleForm>
  </Edit>
);