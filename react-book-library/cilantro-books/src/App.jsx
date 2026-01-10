import React from 'react';
import { Admin, Resource, CustomRoutes } from 'react-admin';
import { Route } from 'react-router-dom';

// Providers
import dataProvider from './providers/dataProvider';
//import authProvider from './providers/authProvider';

// Dashboard
import { Dashboard } from './dashboard';

// Favorites Page
import { FavoritesPage } from './components/FavoritesPage';

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
import FavoriteIcon from '@mui/icons-material/Favorite';

// Simple List Components
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
import { Layout, AppBar, Menu } from 'react-admin';
import { Typography, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Custom Menu with Favorites
const CustomMenu = (props) => {
  const navigate = useNavigate();
  
  return (
    <Menu {...props}>
      <Menu.DashboardItem />
      <Menu.ResourceItem name="books" />
      <Menu.ResourceItem name="authors" />
      <Menu.ResourceItem name="user_books" />
      <Menu.ResourceItem name="user_book_reviews" />
      
      {/* Custom Favorites Menu Item */}
      <MenuItem onClick={() => navigate('/favorites')}>
        <FavoriteIcon sx={{ mr: 2 }} />
        <Typography>Favorites</Typography>
      </MenuItem>
      
      <Menu.ResourceItem name="genres" />
      <Menu.ResourceItem name="tags" />
      <Menu.ResourceItem name="users" />
    </Menu>
  );
};

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
      🌿 Cilantro Books
    </Typography>
  </AppBar>
);

const CustomLayout = (props) => (
  <Layout {...props} appBar={CustomAppBar} menu={CustomMenu} />
);

function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      
      dashboard={Dashboard}
      layout={CustomLayout}
    >
      {/* Custom Routes */}
      <CustomRoutes>
        <Route path="/favorites" element={<FavoritesPage />} />
      </CustomRoutes>

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