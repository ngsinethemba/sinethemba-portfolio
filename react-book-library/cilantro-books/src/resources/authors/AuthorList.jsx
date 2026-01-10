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
  ExportButton,
  useRecordContext 
} from 'react-admin';
import { Box, Avatar, Typography } from '@mui/material';

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

const AuthorNameWithAvatar = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Avatar
        src={record.image_url}
        alt={record.name}
        sx={{ width: 32, height: 32 }}
      >
        {!record.image_url && record.name?.charAt(0)}
      </Avatar>

      <Typography variant="body2" noWrap>
        {record.name}
      </Typography>
    </Box>
  );
};


export const AuthorList = () => (
  <List
    filters={authorFilters}
    actions={<ListActions />}
    sort={{ field: 'name', order: 'ASC' }}
  >
<Datagrid rowClick="show" bulkActionButtons={false}>
  <AuthorNameWithAvatar label="Name" />
  <NumberField source="birth_year" label="Born" />
  <TextField source="country" />
  <ShowButton />
  <EditButton />
</Datagrid>

  </List>
);