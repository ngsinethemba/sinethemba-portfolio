import React, { useState } from 'react';
import {
  useListContext,
  useNotify,
  useGetList,
  useCreate,
  useDataProvider,
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
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder, Add, LocalOffer } from '@mui/icons-material';

const CURRENT_USER_ID = 1;

export const BookGrid = () => {
  const { data, isLoading } = useListContext();
  const navigate = useNavigate();
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const [create] = useCreate();

  // Tag dialog state
  const [tagDialogOpen, setTagDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newTag, setNewTag] = useState('');

  // Local UI state for user tags (temporary until auth + preload)
  const [userTags, setUserTags] = useState({}); // { [bookId]: ['tag1'] }

  // Favorites
  const [favoriteBooks, setFavoriteBooks] = useState(
    JSON.parse(localStorage.getItem('favoriteBooks') || '[]')
  );

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // Fetch genres
  const { data: genres } = useGetList('genres', {
    pagination: { page: 1, perPage: 100 },
  });

  if (isLoading) {
    return <Box p={3}>Loading books...</Box>;
  }

  const getGenreName = (genreId) =>
    genres?.find((g) => g.id === genreId)?.name || 'Unknown';

  // ⭐ Favorites
  const handleFavoriteToggle = (e, bookId) => {
    e.stopPropagation();

    const isFavorite = favoriteBooks.includes(bookId);
    const updated = isFavorite
      ? favoriteBooks.filter((id) => id !== bookId)
      : [...favoriteBooks, bookId];

    setFavoriteBooks(updated);
    localStorage.setItem('favoriteBooks', JSON.stringify(updated));

    setSnackbar({
      open: true,
      message: isFavorite ? 'Removed from favorites' : 'Added to favorites!',
      severity: isFavorite ? 'info' : 'success',
    });
  };

  // 🏷️ Add tag handler (FIXED)
  const handleAddTag = async () => {
    if (!newTag.trim() || !selectedBook) return;

    try {
      // 1️⃣ Check if tag already exists
      const { data: existingTags } = await dataProvider.getList('tags', {
        filter: { name: newTag.trim() },
        pagination: { page: 1, perPage: 1 },
        sort: { field: 'id', order: 'ASC' },
      });

      let tagId;

      if (existingTags.length > 0) {
        tagId = existingTags[0].id;
      } else {
        // 2️⃣ Create tag
        const { data: createdTag } = await create('tags', {
          data: {
            name: newTag.trim(),
            category: 'User',
          },
        });
        tagId = createdTag.id;
      }

      // 3️⃣ Link tag to book (with user_id)
      await create('book_tags', {
        data: {
          book_id: selectedBook.id,
          tag_id: tagId,
          user_id: CURRENT_USER_ID,
        },
      });

      // 4️⃣ Update UI
      setUserTags((prev) => ({
        ...prev,
        [selectedBook.id]: [
          ...(prev[selectedBook.id] || []),
          newTag.trim(),
        ],
      }));

      setNewTag('');
      setTagDialogOpen(false);

      notify('Tag added', { type: 'success' });
    } catch (error) {
      console.error(error);
      notify('Failed to add tag', { type: 'error' });
    }
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
                  <CardMedia
                    component="img"
                    height="400"
                    image={
                      book.cover_image_url ||
                      'https://via.placeholder.com/300x400/e0e0e0/666666?text=No+Cover'
                    }
                    alt={book.title}
                  />

                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* GENRE + USER TAGS */}
                    <Box display="flex" alignItems="center" gap={0.5} flexWrap="wrap" mb={1}>
                      <Chip
                        label={getGenreName(book.genre_id)}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />

                      {(userTags[book.id] || []).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          color="secondary"
                        />
                      ))}

                      <Tooltip title="Add tags to this book">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBook(book);
                            setTagDialogOpen(true);
                          }}
                        >
                          <LocalOffer fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* TITLE */}
                    <Typography fontWeight="bold" mb={0.5}>
                      {book.title}
                    </Typography>

                    {/* RATING */}
                    <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
                      <Rating value={book.average_rating || 0} readOnly size="small" />
                      <Typography variant="caption">
                        {book.average_rating?.toFixed(1) || 'N/A'}
                      </Typography>
                    </Box>

                    {/* FOOTER */}
                    <Box mt="auto" display="flex" justifyContent="space-between">
                      <Typography variant="caption">{book.publication_year}</Typography>
                      <Typography variant="caption">{book.pages} pages</Typography>
                    </Box>

                    {/* ACTIONS */}
                    <Box display="flex" justifyContent="flex-end" gap={1} pt={1}>
                      <Tooltip title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleFavoriteToggle(e, book.id)}
                          color={isFavorite ? 'error' : 'default'}
                        >
                          {isFavorite ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Add to Shelf">
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Add />}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/user_books/create');
                          }}
                        >
                          Add to Shelf
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

      {/* TAG DIALOG */}
      <Dialog open={tagDialogOpen} onClose={() => setTagDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add tags</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Tag"
            placeholder="e.g. Favourite, To Read"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTagDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddTag}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};
