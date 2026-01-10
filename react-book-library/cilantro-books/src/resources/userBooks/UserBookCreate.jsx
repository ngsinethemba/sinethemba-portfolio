import React, { useEffect } from 'react';
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DateInput,
  BooleanInput,
  required,
  useNotify,
} from 'react-admin';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Toolbar, SaveButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';


export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <BackButton label="Cancel" variant="outlined" color="inherit" sx={{ ml: 2 }} />
  </Toolbar>
);

export const UserBookCreate = () => {
  const location = useLocation();
  const notify = useNotify();
  
  // Get pre-selected book ID from navigation state
  const preSelectedBookId = location.state?.bookId;

  useEffect(() => {
    if (preSelectedBookId) {
      notify('Book pre-selected! Choose your reading status.', { type: 'info' });
    }
  }, [preSelectedBookId, notify]);

  // Transform data before sending to API
  const transform = (data) => {
    // Remove empty/undefined fields
    const transformed = { ...data };
    
    // Remove date fields if empty (Trailbase doesn't like empty strings)
    if (!transformed.date_started) delete transformed.date_started;
    if (!transformed.date_finished) delete transformed.date_finished;
    
    // Ensure boolean is 0 or 1 for SQLite
    transformed.is_favorite = transformed.is_favorite ? 1 : 0;
    
    // Ensure IDs are integers
    transformed.user_id = parseInt(transformed.user_id);
    transformed.book_id = parseInt(transformed.book_id);
    transformed.status_id = parseInt(transformed.status_id);
    
    console.log('Transformed data:', transformed);
    return transformed;
  };

  return (
    <Create transform={transform}>
      <SimpleForm
        defaultValues={{
          book_id: preSelectedBookId || undefined,
          status_id: 1, // Default to "To Read"
          is_favorite: 0, // Use 0 instead of false for SQLite
        }} toolbar={<CustomToolbar />}
      >
        <Card sx={{ mb: 2, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
          <CardContent>
            <Typography variant="h6">
              📚 Add Book to Your Shelf
            </Typography>
            <Typography variant="body2">
              {preSelectedBookId 
                ? 'Your book is already selected! Just choose your reading status below.' 
                : 'Select a book and your reading status to add it to your personal library.'
              }
            </Typography>
          </CardContent>
        </Card>

        <ReferenceInput source="user_id" reference="users">
          <SelectInput 
            optionText="username" 
            validate={[required()]} 
            helperText="Select your user account"
          />
        </ReferenceInput>

        <ReferenceInput source="book_id" reference="books">
          <SelectInput 
            optionText="title" 
            validate={[required()]}
            disabled={!!preSelectedBookId}
            helperText={preSelectedBookId 
              ? "Book is pre-selected from your search" 
              : "Search and select a book"
            }
          />
        </ReferenceInput>

        <ReferenceInput source="status_id" reference="reading_statuses">
          <SelectInput 
            optionText="status_name" 
            validate={[required()]}
            helperText="What's your reading status for this book?"
          />
        </ReferenceInput>

        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.default', 
          borderRadius: 1,
          mb: 2
        }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Optional: Add dates if you've already started or finished this book
          </Typography>
          <DateInput 
            source="date_started" 
            helperText="When did you start reading?"
          />
          <DateInput 
            source="date_finished"
            helperText="When did you finish reading?"
          />
        </Box>

        <BooleanInput 
          source="is_favorite" 
          label="⭐ Mark as Favorite"
          helperText="Add this book to your favorites list"
        />
      </SimpleForm>
    </Create>
  );
};