import React from 'react';
import { Card, CardContent, CardHeader, List, ListItem, ListItemText, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const RecentBooks = ({ books }) => {
  const navigate = useNavigate();
  const recentBooks = books?.slice(0, 5) || [];

  return (
    <Card>
      <CardHeader title="Recent Books" />
      <CardContent>
        <List>
          {recentBooks.map((book) => (
            <ListItem
              key={book.id}
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' },
                borderRadius: 1,
                mb: 1,
              }}
              onClick={() => navigate(`/books/${book.id}/show`)}
            >
              <ListItemText
                primary={book.title}
                secondary={`${book.publication_year} • ${book.pages} pages`}
              />
              <Chip
                label={`⭐ ${book.average_rating}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};