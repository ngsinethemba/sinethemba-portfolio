import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  NumberInput,
  TextInput,
  BooleanInput,
  required,
  minValue,
  maxValue,
} from 'react-admin';
import { Box, Typography } from '@mui/material';
import { Toolbar, SaveButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';


export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <BackButton label="Cancel" variant="outlined" color="inherit" sx={{ ml: 2 }} />
  </Toolbar>
);

export const ReviewEdit = () => (
  <Edit>
    <SimpleForm toolbar={<CustomToolbar />}>
      <Typography variant="h6" gutterBottom>
        Edit Your Review
      </Typography>

      <ReferenceInput source="user_book_id" reference="user_books">
        <SelectInput optionText={(record) => `${record.id}`} disabled />
      </ReferenceInput>

      <Box sx={{ my: 2 }}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Your Rating
        </Typography>
        <NumberInput
          source="rating"
          validate={[required(), minValue(1), maxValue(5)]}
          min={1}
          max={5}
        />
      </Box>

      <TextInput
        source="review_text"
        multiline
        rows={6}
        fullWidth
        label="Your Review"
      />

      <BooleanInput
        source="is_spoiler"
        label="This review contains spoilers"
      />
    </SimpleForm>
  </Edit>
);
