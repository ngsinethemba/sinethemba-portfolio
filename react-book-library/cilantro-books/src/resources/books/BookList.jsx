import {
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  ReferenceField,
  EditButton,
  ShowButton,
  SearchInput,
  SelectInput,
  ReferenceInput,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton
} from 'react-admin';
import { Card, CardContent } from '@mui/material';

const bookFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search books..." />,
  <ReferenceInput source="genre_id" reference="genres">
    <SelectInput optionText="name" label="Genre" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const BookList = () => (
  <List
    filters={bookFilters}
    actions={<ListActions />}
    sort={{ field: 'title', order: 'ASC' }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="title" />
      <ReferenceField source="genre_id" reference="genres">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="publication_year" label="Year" />
      <NumberField source="pages" />
      <NumberField
        source="average_rating"
        options={{ maximumFractionDigits: 1 }}
      />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);