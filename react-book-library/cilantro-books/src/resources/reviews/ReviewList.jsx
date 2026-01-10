
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
  BooleanField,
  BooleanInput,
  EditButton,
  ShowButton,
  SearchInput,
  SelectInput,
  ReferenceInput,
  FilterButton,
  TopToolbar,
  CreateButton,
} from 'react-admin';
import { Rating, Chip, Box } from '@mui/material';
import React from 'react';

const reviewFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search reviews..." />,
  <SelectInput
    source="rating"
    choices={[
      { id: 5, name: '5 Stars' },
      { id: 4, name: '4 Stars' },
      { id: 3, name: '3 Stars' },
      { id: 2, name: '2 Stars' },
      { id: 1, name: '1 Star' },
    ]}
  />,
  <BooleanInput source="is_spoiler" label="Spoilers Only" />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Write Review" />
  </TopToolbar>
);

// Custom Rating Field
const RatingField = ({ source, record }) => (
  <Box display="flex" alignItems="center" gap={1}>
    <Rating value={record[source]} readOnly size="small" />
    <Chip label={record[source]} size="small" color="primary" />
  </Box>
);

export const ReviewList = () => (
  <List
    filters={reviewFilters}
    actions={<ListActions />}
    sort={{ field: 'review_date', order: 'DESC' }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <ReferenceField source="user_book_id" reference="user_books" label="Book">
        <ReferenceField source="book_id" reference="books">
          <TextField source="title" />
        </ReferenceField>
      </ReferenceField>
      <ReferenceField source="user_book_id" reference="user_books" label="Reviewer">
        <ReferenceField source="user_id" reference="users">
          <TextField source="username" />
        </ReferenceField>
      </ReferenceField>
      <RatingField source="rating" label="Rating" />
      <BooleanField source="is_spoiler" label="Spoiler" />
      <DateField source="review_date" />
      <NumberField source="likes_count" label="Likes" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);