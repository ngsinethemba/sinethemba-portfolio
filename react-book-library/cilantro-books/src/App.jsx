import { Admin, Resource, ListGuesser, List } from 'react-admin';
import { BookList} from './resources/books/BookList';
import dataProvider from './providers/dataProvider';
//import authProvider from './providers/authProvider';

// Icons
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import { BookShow } from './resources/books/BookShow';
import { BookCreate } from './resources/books/BookCreate';

function App() {
  return (
    <Admin dataProvider={dataProvider} >
      <Resource
        name="books"
        list={BookList} show={BookShow} create={BookCreate}
        icon={BookIcon}
      />
      <Resource
        name="authors"
        list={ListGuesser}
        icon={PersonIcon}
      />
      <Resource
        name="genres"
        list={ListGuesser}
        icon={CategoryIcon}
      />
      <Resource
        name="tags"
        list={ListGuesser}
        icon={LocalOfferIcon}
      />
      <Resource
        name="users"
        list={ListGuesser}
        icon={PeopleIcon}
      />
      {/* Junction tables - no UI needed */}
      <Resource name="book_authors" />
      <Resource name="book_tags" />
      <Resource name="reading_statuses" />
      <Resource name="user_books" />
      <Resource name="user_book_progress" />
      <Resource name="user_book_reviews" />
    </Admin>
  );
}

export default App;