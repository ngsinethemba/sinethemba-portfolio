import React from 'react';
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
  DateField,
  UrlField,
  RichTextField,
  ReferenceManyField,
  Datagrid as ShowDatagrid,
  ReferenceField,
  useRecordContext 
} from 'react-admin';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { TopToolbar, ListButton } from 'react-admin';
import { BackButton } from '../../components/BackButton';

const AuthorShowActions = () => (
  <TopToolbar>
    <BackButton />
    <ListButton label="All Authors" />
  </TopToolbar>
);

const AuthorAvatar = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Avatar
      sx={{ width: 120, height: 120 }}
      src={record.image_url}
      alt={record.name}
    />
  );
};

export const AuthorShow = () => (
  <Show actions={<AuthorShowActions />}>
    <TabbedShowLayout>
      <Tab label="Overview">
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <AuthorAvatar />

          <Box>
            <TextField
              source="name"
              sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            />
            <TextField source="country" />
            <DateField source="birth_year" label="Born" />
          </Box>
        </Box>

        <RichTextField source="bio" />
        <UrlField source="website" />
      </Tab>


      <Tab label="Books" path="books">
        <ReferenceManyField
          reference="book_authors"
          target="author_id"
          label="Books by this Author"
        >
          <ShowDatagrid bulkActionButtons={false}>
            <ReferenceField source="book_id" reference="books" link="show">
              <TextField source="title" />
            </ReferenceField>
            <ReferenceField source="book_id" reference="books">
              <NumberField source="publication_year" label="Year" />
            </ReferenceField>
            <ReferenceField source="book_id" reference="books">
              <NumberField source="average_rating" label="Rating" />
            </ReferenceField>
          </ShowDatagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);