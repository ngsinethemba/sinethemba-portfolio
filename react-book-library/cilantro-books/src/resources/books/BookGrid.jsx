import React from 'react';
import {
  useListContext,
  RecordContextProvider,
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
  Button,
  IconButton,
  Rating,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder, Add, LocalOffer } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

export const BookGrid = () => {
  const { data, isLoading } = useListContext();
  const navigate = useNavigate();
  
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

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {data?.map((book) => (
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
              {/* Book Cover */}
              <CardMedia
                component="img"
                height="300"
                image={
                  book.cover_image_url ||
                  'https://via.placeholder.com/200x300?text=No+Cover'
                }
                alt={book.title}
                sx={{
                  objectFit: 'cover',
                  backgroundColor: '#f5f5f5',
                }}
              />

              <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
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

                <Tooltip title="Add tags to this book">
                  <LocalOffer
                    fontSize="small"
                    color="action"
                    sx={{ opacity: 0.7, cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>




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
                    minHeight: '3.6em',
                  }}
                >
                  {book.title}
                </Typography>

                {/* Subtitle (if exists) */}
                {book.subtitle && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      mb: 1,
                    }}
                  >
                    {book.subtitle}
                  </Typography>
                )}

                {/* Rating */}
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Rating
                    value={book.average_rating}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <Typography variant="body2" color="text.secondary">
                    {book.average_rating?.toFixed(1)} ({book.ratings_count?.toLocaleString()})
                  </Typography>
                </Box>

                {/* Meta Info */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  pt={2}
                  borderTop={1}
                  borderColor="divider"
                >
                  <Typography variant="body2" color="text.secondary">
                    {book.publication_year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {book.pages} pages
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  gap={1}
                  mt={1}
                >
                  <Tooltip title="Add to favourites">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Add to favorites:', book.id);
                      }}
                    >
                      <FavoriteBorder fontSize="small" />
                    </IconButton>
                  </Tooltip>

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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};