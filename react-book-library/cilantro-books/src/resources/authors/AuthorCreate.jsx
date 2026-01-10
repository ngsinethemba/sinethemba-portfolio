import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
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

export const AuthorCreate = () => (
  <Create redirect="show">
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="name" validate={[required()]} fullWidth />
      <TextInput source="bio" multiline rows={4} fullWidth />
      <NumberInput
        source="birth_year"
        validate={[minValue(1000), maxValue(new Date().getFullYear())]}
      />
      <TextInput source="country" />
      <TextInput source="website" type="url" fullWidth />
      <TextInput source="image_url" label="Image URL" fullWidth />
    </SimpleForm>
  </Create>
);