import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  NumberField,
  ReferenceManyField,
  Datagrid,
} from 'react-admin';
import { Card, CardContent, Box, Typography, Chip, LinearProgress } from '@mui/material';

export const UserBookShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="Details">
        <ReferenceField source="book_id" reference="books" link="show">
          <TextField source="title" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }} />
        </ReferenceField>
        <ReferenceField source="user_id" reference="users">
          <TextField source="username" />
        </ReferenceField>
        <ReferenceField source="status_id" reference="reading_statuses">
          <TextField source="status_name" />
        </ReferenceField>
        <DateField source="date_added" />
        <DateField source="date_started" />
        <DateField source="date_finished" />
        <BooleanField source="is_favorite" label="Marked as Favorite" />
      </Tab>

      <Tab label="Reading Progress" path="progress">
        <ReferenceManyField
          reference="user_book_progress"
          target="user_book_id"
          label="Progress Updates"
        >
          <Datagrid bulkActionButtons={false}>
            <NumberField source="current_page" />
            <NumberField
              source="progress_percent"
              options={{ style: 'percent', maximumFractionDigits: 1 }}
            />
            <DateField source="last_updated" showTime />
          </Datagrid>
        </ReferenceManyField>
      </Tab>

      <Tab label="My Review" path="review">
        <ReferenceManyField
          reference="user_book_reviews"
          target="user_book_id"
          label="Reviews"
        >
          <Datagrid bulkActionButtons={false}>
            <NumberField source="rating" label="Rating (out of 5)" />
            <TextField source="review_text" />
            <BooleanField source="is_spoiler" label="Contains Spoilers" />
            <DateField source="review_date" />
            <NumberField source="likes_count" label="Likes" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);