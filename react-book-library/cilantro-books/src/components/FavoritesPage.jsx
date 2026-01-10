import React, { useState, useEffect } from 'react';
import { useDataProvider, useNotify } from 'react-admin';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const navigate = useNavigate();

  useEffect(() => {
    // Get favorite book IDs from localStorage
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    setFavoriteBooks(favoriteIds);

    // Fetch book details for favorites
    if (favoriteIds.length > 0) {
      Promise.all(
        favoriteIds.map(id => 
          dataProvider.getOne('books', { id })
            .then(response => response.data)
            .catch(() => null)
        )
      )
        .then(bookData => {
          setBooks(bookData.filter(book => book !== null));
          setLoading(false);
        })
        .catch(error => {
          notify('Error loading favorites', { type: 'error' });
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [dataProvider, notify]);

  const handleRemoveFavorite = (bookId) => {
    const updatedFavorites = favoriteBooks.filter(id => id !== bookId);
    setFavoriteBooks(updatedFavorites);
    setBooks(books.filter(book => book.id !== bookId));
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
    notify('Removed from favorites', { type: 'info' });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (books.length === 0) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Your Favorite Books
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          You haven't added any books to your favorites yet.
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Click the heart icon on any book to add it to your favorites!
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        ❤️ Your Favorite Books
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        {books.length} {books.length === 1 ? 'book' : 'books'} in your favorites
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Book Cover */}
              <CardMedia
                component="img"
                height="400"
                image={
                  book.cover_image_url ||
                  'https://via.placeholder.com/300x400/e0e0e0/666666?text=No+Cover'
                }
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/books/${book.id}/show`)}
              />

              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                {/* Title */}
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/books/${book.id}/show`)}
                >
                  {book.title}
                </Typography>

                {/* Rating */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Rating
                    value={book.average_rating || 0}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {book.average_rating?.toFixed(1) || 'N/A'}
                  </Typography>
                </Box>

                {/* Meta */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    {book.publication_year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.pages} pages
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/books/${book.id}/show`)}
                    color="primary"
                  >
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFavorite(book.id)}
                    color="error"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};