import React, { useState } from 'react';
import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  EditButton,
  ShowButton,
  SelectInput,
  ReferenceInput,
  FilterButton,
  TopToolbar,
  CreateButton,
  useListContext,
} from 'react-admin';
import { Tabs, Tab, Box, Chip } from '@mui/material';

const userBookFilters = [
  <ReferenceInput source="user_id" reference="users">
    <SelectInput optionText="username" label="User" />
  </ReferenceInput>,
  <ReferenceInput source="status_id" reference="reading_statuses">
    <SelectInput optionText="status_name" label="Status" />
  </ReferenceInput>,
];

const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton label="Add Book to Shelf" />
  </TopToolbar>
);

const TabbedDatagrid = () => {
  const listContext = useListContext();
  const { data, isLoading } = listContext;
  const [selectedTab, setSelectedTab] = useState(0);

  if (isLoading) return null;

  // Group by status
  const toRead = data?.filter((ub) => ub.status_id === 1) || [];
  const currentlyReading = data?.filter((ub) => ub.status_id === 2) || [];
  const completed = data?.filter((ub) => ub.status_id === 3) || [];
  const dnf = data?.filter((ub) => ub.status_id === 4) || [];

  const tabs = [
    { label: 'All', data: data, count: data?.length || 0 },
    { label: 'To Read', data: toRead, count: toRead.length },
    { label: 'Reading', data: currentlyReading, count: currentlyReading.length },
    { label: 'Completed', data: completed, count: completed.length },
    { label: 'DNF', data: dnf, count: dnf.length },
  ];

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={(e, value) => setSelectedTab(value)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={
              <Box display="flex" alignItems="center" gap={1}>
                {tab.label}
                <Chip label={tab.count} size="small" color="primary" />
              </Box>
            }
          />
        ))}
      </Tabs>

      <Datagrid data={tabs[selectedTab].data} bulkActionButtons={false}>
        <ReferenceField source="book_id" reference="books" link="show">
          <TextField source="title" />
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
        <BooleanField source="is_favorite" label="Favorite" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </Box>
  );
};

export const UserBookList = () => (
  <List
    filters={userBookFilters}
    actions={<ListActions />}
    sort={{ field: 'date_added', order: 'DESC' }}
  >
    <TabbedDatagrid />
  </List>
);