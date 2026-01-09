import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
  RichTextField,
  ArrayField,
  Datagrid,
  TabbedShowLayout,
  Tab,
  ReferenceManyField
} from 'react-admin';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';

export const BookShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="Overview">
        <TextField source="title" />
        <TextField source="subtitle" />
        <ReferenceField source="genre_id" reference="genres">
          <TextField source="name" />
        </ReferenceField>
        <NumberField source="publication_year" />
        <TextField source="publisher" />
        <NumberField source="pages" />
        <TextField source="language" />
        <TextField source="isbn" />
        <NumberField
          source="average_rating"
          options={{ maximumFractionDigits: 1 }}
        />
        <NumberField source="ratings_count" />
        <RichTextField source="description" />
      </Tab>

      <Tab label="Authors" path="authors">
        <ReferenceManyField
          reference="book_authors"
          target="book_id"
          label="Authors"
        >
          <Datagrid bulkActionButtons={false}>
            <ReferenceField source="author_id" reference="authors">
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="author_order" label="Order" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>

      <Tab label="Tags" path="tags">
        <ReferenceManyField
          reference="book_tags"
          target="book_id"
          label="Tags"
        >
          <Datagrid bulkActionButtons={false}>
            <ReferenceField source="tag_id" reference="tags">
              <TextField source="name" />
            </ReferenceField>
          </Datagrid>
        </ReferenceManyField>
      </Tab>

      <Tab label="Reviews" path="reviews">
        <ReferenceManyField
          reference="user_books"
          target="book_id"
          label="User Reviews"
        >
          <Datagrid bulkActionButtons={false}>
            <ReferenceField source="user_id" reference="users">
              <TextField source="username" />
            </ReferenceField>
            <ReferenceField source="status_id" reference="reading_statuses">
              <TextField source="status_name" />
            </ReferenceField>
            <DateField source="date_finished" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);