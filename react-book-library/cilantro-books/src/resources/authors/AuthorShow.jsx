import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  NumberField,
  UrlField,
  RichTextField,
  ReferenceManyField,
  Datagrid as ShowDatagrid,
  ReferenceField,
} from 'react-admin';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

export const AuthorShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="Overview">
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Avatar
            sx={{ width: 120, height: 120 }}
            src="" // Could link to image_url field
            alt="Author"
          />
          <Box>
            <TextField source="name" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} />
            <TextField source="country" />
            <NumberField source="birth_year" label="Born" />
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