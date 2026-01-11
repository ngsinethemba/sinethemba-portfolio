import React from 'react';
import { DateInput, Edit, NumberInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin';
import { Toolbar, SaveButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';


export const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
    <BackButton label="Cancel" variant="outlined" color="inherit" sx={{ ml: 2 }} />
  </Toolbar>
);

export const BookEdit = () => (
    <Edit>
        <SimpleForm toolbar={<CustomToolbar />}>
            <NumberInput source="average_rating" />
            <TextInput source="cover_image_url" />
            <DateInput source="created_at" />
            <TextInput source="description" />
            <ReferenceInput source="genre_id" reference="genres" />
            <TextInput source="id" />
            <TextInput source="isbn" />
            <TextInput source="language" />
            <NumberInput source="pages" />
            <NumberInput source="publication_year" />
            <TextInput source="publisher" />
            <NumberInput source="ratings_count" />
            <TextInput source="subtitle" />
            <TextInput source="title" />
        </SimpleForm>
    </Edit>
);