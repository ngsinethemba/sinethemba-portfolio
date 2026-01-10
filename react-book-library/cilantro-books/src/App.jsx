import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';
import React from 'react';

// Providers
import dataProvider from './providers/dataProvider';
//import authProvider from './providers/authProvider';

// Dashboard
import { Dashboard } from './dashboard';

// Books
import { BookList, BookShow, BookCreate, BookEdit } from './resources/books';

// Authors
import { AuthorList, AuthorShow, AuthorCreate, AuthorEdit } from './resources/authors';

// User Books (Shelves)
import {
  UserBookList,
  UserBookShow,
  UserBookCreate,
  UserBookEdit,
} from './resources/userBooks';

// Reviews
import {
  ReviewList,
  ReviewShow,
  ReviewCreate,
  ReviewEdit,
} from './resources/reviews';

// Simple list components for other resources
import { List, Datagrid, TextField, EditButton, ShowButton } from 'react-admin';

// Icons
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DashboardIcon from '@mui/icons-material/Dashboard';

// Simple List Components for smaller resources
const GenreList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);

const TagList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="name" />
      <TextField source="category" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserList = () => (
  <List>
    <Datagrid rowClick="show" bulkActionButtons={false}>
      <TextField source="username" />
      <TextField source="full_name" />
      <TextField source="email" />
      <TextField source="favorite_genres" />
      <ShowButton />
      <EditButton />
    </Datagrid>
  </List>
);

const ReadingStatusList = () => (
  <List>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="status_name" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);

// Custom Layout with theming
import { Layout, AppBar } from 'react-admin';
import { Typography, Box } from '@mui/material';

const CustomAppBar = () => (
  <AppBar
    sx={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      '& .RaAppBar-title': {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    }}
  >
    <Typography variant="h6" component="span" sx={{ flex: 1 }}>
       Cilantro Books
    </Typography>
  </AppBar>
);

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

function App() {
  return (
    <Admin
      dataProvider={dataProvider}

      dashboard={Dashboard}
      layout={CustomLayout}
    >
      {/* Main Resources */}
      <Resource
        name="books"
        list={BookList}
        show={BookShow}
        create={BookCreate}
        edit={BookEdit}
        icon={BookIcon}
        options={{ label: 'Books' }}
      />

      <Resource
        name="authors"
        list={AuthorList}
        show={AuthorShow}
        create={AuthorCreate}
        edit={AuthorEdit}
        icon={PersonIcon}
        options={{ label: 'Authors' }}
      />

      <Resource
        name="user_books"
        list={UserBookList}
        show={UserBookShow}
        create={UserBookCreate}
        edit={UserBookEdit}
        icon={LibraryBooksIcon}
        options={{ label: 'My Shelf' }}
      />

      <Resource
        name="user_book_reviews"
        list={ReviewList}
        show={ReviewShow}
        create={ReviewCreate}
        edit={ReviewEdit}
        icon={RateReviewIcon}
        options={{ label: 'Reviews' }}
      />

      {/* Secondary Resources */}
      <Resource
        name="genres"
        list={GenreList}
        icon={CategoryIcon}
        options={{ label: 'Genres' }}
      />

      <Resource
        name="tags"
        list={TagList}
        icon={LocalOfferIcon}
        options={{ label: 'Tags' }}
      />

      <Resource
        name="users"
        list={UserList}
        icon={PeopleIcon}
        options={{ label: 'Users' }}
      />

      <Resource
        name="reading_statuses"
        list={ReadingStatusList}
        options={{ label: 'Reading Statuses' }}
      />

      {/* Junction tables - no UI needed */}
      <Resource name="book_authors" />
      <Resource name="book_tags" />
      <Resource name="user_book_progress" />
    </Admin>
  );
}

export default App;