import React, { useState } from 'react';
import {
  useListContext,
  useNotify,
  useRedirect,
  useGetList,
} from 'react-admin';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Rating,
  Snackbar,
  Alert,
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder, Add, LocalOffer  } from '@mui/icons-material';

export const BookGrid = () => {
  const { data, isLoading } = useListContext();
  const navigate = useNavigate();
  const notify = useNotify();
  const redirect = useRedirect();
  
  // State for favorite books (in a real app, this would be in backend)
  const [favoriteBooks, setFavoriteBooks] = useState(
    JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  );
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // Fetch genres for display
  const { data: genres } = useGetList('genres', {
    pagination: { page: 1, perPage: 100 },
  });

  if (isLoading) {
    return <Box p={3}>Loading books...</Box>;
  }

  const getGenreName = (genreId) => {
    return genres?.find((g) => g.id === genreId)?.name || 'Unknown';
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (e, bookId) => {
    e.stopPropagation();
    
    const isFavorite = favoriteBooks.includes(bookId);
    
    if (isFavorite) {
      // Remove from favorites
      const updatedFavorites = favoriteBooks.filter(id => id !== bookId);
      setFavoriteBooks(updatedFavorites);
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      setSnackbar({
        open: true,
        message: 'Removed from favorites',
        severity: 'info'
      });
    } else {
      // Add to favorites
      const updatedFavorites = [...favoriteBooks, bookId];
      setFavoriteBooks(updatedFavorites);
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      setSnackbar({
        open: true,
        message: 'Added to favorites! Click the heart icon in the menu to view all favorites.',
        severity: 'success'
      });
    }
  };

  // Handle add to shelf with pre-selected book
  const handleAddToShelf = (e, bookId) => {
    e.stopPropagation();
    // Navigate to create page with book pre-selected
    navigate('/user_books/create', { state: { bookId } });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {data?.map((book) => {
            const isFavorite = favoriteBooks.includes(book.id);
            
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => navigate(`/books/${book.id}/show`)}
                >
                  {/* Book Cover - FIXED: Uniform height */}
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
                      backgroundColor: '#f5f5f5',
                      minHeight: '400px',
                      maxHeight: '400px',
                    }}
                  />

                  <CardContent sx={{ 
                    flexGrow: 1, 
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    pb: 2, // Padding bottom to prevent cutoff
                  }}>
                    {/* Genre Chip */}
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={0.5}
                    sx={{ mb: 1 }}
                  >
                    <Chip
                      label={getGenreName(book.genre_id)}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />

                    <Tooltip title="Add tags to this book" enterDelay={300}>
                      <LocalOffer
                        fontSize="small"
                        color="action"
                        sx={{ opacity: 0.7, cursor: 'pointer' }}
                      />
                    </Tooltip>
                  </Box>



                    {/* Title - Multi-line support */}
                    <Typography
                      variant="body1"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3, // Allow 3 lines for title
                        WebkitBoxOrient: 'vertical',
                        minHeight: '4.5em',
                        lineHeight: 1.5,
                        mb: 0.5,
                      }}
                    >
                      {book.title}
                    </Typography>

                    {/* Subtitle (if exists) - Multi-line */}
                    {book.subtitle && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Allow 2 lines for subtitle
                          WebkitBoxOrient: 'vertical',
                          mb: 1,
                          lineHeight: 1.3,
                        }}
                      >
                        {book.subtitle}
                      </Typography>
                    )}

                    {/* Rating */}
                    <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
                      <Rating
                        value={book.average_rating || 0}
                        precision={0.1}
                        size="small"
                        readOnly
                      />
                      <Typography variant="caption" color="text.secondary">
                        {book.average_rating?.toFixed(1) || 'N/A'}
                      </Typography>
                    </Box>

                    {/* Meta Info */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mt="auto"
                      pt={1.5}
                      borderTop={1}
                      borderColor="divider"
                      mb={1}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {book.publication_year}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {book.pages} pages
                      </Typography>
                    </Box>

                    {/* Action Buttons - More spacing */}
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      gap={1}
                      pt={1}
                    >
                      
                    <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} enterDelay={300}>
                      <IconButton
                        size="small"
                        onClick={(e) => handleFavoriteToggle(e, book.id)}
                        sx={{
                          color: isFavorite ? 'error.main' : 'action.active',
                          '&:hover': {
                            backgroundColor: isFavorite ? 'error.light' : 'action.hover',
                          }
                        }}
                      >
                        {isFavorite ? (
                          <Favorite fontSize="small" />
                        ) : (
                          <FavoriteBorder fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add to Shelf" enterDelay={300}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<Add />}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Add to shelf:', book.id);
                          navigate('/user_books/create');
                        }}
                      >
                        ADD to Shelf
                      </Button>
                    </Tooltip>

                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
