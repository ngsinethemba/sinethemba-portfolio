import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  required,
  minValue,
  maxValue
} from 'react-admin';
import { Toolbar, SaveButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';


export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <BackButton label="Cancel" variant="outlined" color="inherit" sx={{ ml: 2 }} />
  </Toolbar>
);

export const BookCreate = () => (
  <Create>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="subtitle" fullWidth />
      <TextInput source="isbn" label="ISBN" />
      <ReferenceInput source="genre_id" reference="genres">
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <NumberInput
        source="publication_year"
        validate={[minValue(1000), maxValue(new Date().getFullYear())]}
      />
      <TextInput source="publisher" />
      <NumberInput source="pages" validate={[minValue(1)]} />
      <SelectInput
        source="language"
        choices={[
          { id: 'English', name: 'English' },
          { id: 'Spanish', name: 'Spanish' },
          { id: 'French', name: 'French' },
          { id: 'German', name: 'German' },
          { id: 'Other', name: 'Other' },
        ]}
      />
      <TextInput source="description" multiline rows={4} fullWidth />
      <TextInput source="cover_image_url" fullWidth />
    </SimpleForm>
  </Create>
);