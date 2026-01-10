import React from 'react';
import {
  Create,
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

export const ReviewCreate = () => (
  <Create>
    <SimpleForm>
      <Typography variant="h6" gutterBottom>
        Write a Review
      </Typography>

      <ReferenceInput source="user_book_id" reference="user_books">
        <SelectInput
          optionText={(record) => `${record.id}`}
          validate={[required()]}
          helperText="Select a book from your shelf"
        />
      </ReferenceInput>

      <Box sx={{ my: 2 }}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Your Rating
        </Typography>
        <NumberInput
          source="rating"
          validate={[required(), minValue(1), maxValue(5)]}
          helperText="Rate from 1 to 5 stars"
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
        helperText="Share your thoughts about this book"
      />

      <BooleanInput
        source="is_spoiler"
        label="This review contains spoilers"
        helperText="Check this if your review reveals plot details"
      />
    </SimpleForm>
  </Create>
);