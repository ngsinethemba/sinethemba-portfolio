import React from 'react';
import { Card, CardContent, CardHeader, Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';

export const TopGenres = ({ books }) => {
  const { data: genres } = useGetList('genres', {
    pagination: { page: 1, perPage: 100 },
  });

  // Count books per genre
  const genreCounts = {};
  books?.forEach((book) => {
    genreCounts[book.genre_id] = (genreCounts[book.genre_id] || 0) + 1;
  });

  // Get top 5 genres
  const topGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([genreId, count]) => ({
      name: genres?.find((g) => g.id === parseInt(genreId))?.name || 'Unknown',
      count,
    }));

  return (
    <Card>
      <CardHeader title="Top Genres" />
      <CardContent>
        {topGenres.map((genre, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: 2,
              pb: 2,
              borderBottom: index < topGenres.length - 1 ? '1px solid #eee' : 'none',
            }}
          >
            <Typography>{genre.name}</Typography>
            <Typography fontWeight="bold" color="primary">
              {genre.count} books
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};