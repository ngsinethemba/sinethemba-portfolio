import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  minValue,
  maxValue
} from 'react-admin';

export const AuthorEdit = () => (
  <Edit>
    <SimpleForm>
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
  </Edit>
);