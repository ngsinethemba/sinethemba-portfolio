import React, { useState } from 'react';
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
  ExportButton,
} from 'react-admin';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { ViewList, ViewModule } from '@mui/icons-material';
import { BookGrid } from './BookGrid';

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

export const BookList = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  return (
    <List
      filters={bookFilters}
      actions={<ListActions />}
      sort={{ field: 'title', order: 'ASC' }}
      perPage={24}
    >
      {/* View Toggle */}
      <TopToolbar sx={{ justifyContent: 'space-between', mb: 2 }}>
        <div />
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid">
            <ViewModule /> Grid
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList /> List
          </ToggleButton>
        </ToggleButtonGroup>
      </TopToolbar>

      {/* Conditional Rendering */}
      {viewMode === 'grid' ? (
        <BookGrid />
      ) : (
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
      )}
    </List>
  );
};