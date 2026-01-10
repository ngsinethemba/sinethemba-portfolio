import {
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  ShowButton,
  SearchInput,
  TextInput,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton
} from 'react-admin';
import React from 'react';

const authorFilters = [
  <SearchInput source="q" alwaysOn placeholder="Search authors..." />,
  <TextInput source="country" label="Country" />,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const AuthorList = () => (
  <List
    filters={authorFilters}
    actions={<ListActions />}
    sort={{ field: 'name', order: 'ASC' }}
  >
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="name" />
      <NumberField source="birth_year" label="Born" />
      <TextField source="country" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);