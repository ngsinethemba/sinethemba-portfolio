import React from 'react';
import { Card, CardContent, CardHeader, Box, Grid } from '@mui/material';
import {
  MenuBookOutlined,
  PersonOutline,
  StarOutline,
  TrendingUp,
} from '@mui/icons-material';
import { useGetList } from 'react-admin';
import { StatCard } from './StatCard';
import { RecentBooks } from './RecentBooks';
import { TopGenres } from './TopGenres';
import { ReadingProgress } from './ReadingProgress';

export const Dashboard = () => {
  // Fetch data using react-admin hooks
  const { data: books, isLoading: booksLoading } = useGetList('books', {
    pagination: { page: 1, perPage: 1000 },
  });

  const { data: authors, isLoading: authorsLoading } = useGetList('authors', {
    pagination: { page: 1, perPage: 1000 },
  });

  const { data: userBooks, isLoading: userBooksLoading } = useGetList('user_books', {
    pagination: { page: 1, perPage: 1000 },
  });

  const { data: reviews, isLoading: reviewsLoading } = useGetList('user_book_reviews', {
    pagination: { page: 1, perPage: 1000 },
  });

  // Calculate statistics
  const totalBooks = books?.length || 0;
  const totalAuthors = authors?.length || 0;
  const booksRead = userBooks?.filter(ub => ub.status_id === 3).length || 0; // Completed
  const averageRating = reviews?.length 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const isLoading = booksLoading || authorsLoading || userBooksLoading || reviewsLoading;

  if (isLoading) {
    return <Box p={3}>Loading dashboard...</Box>;
  }

  return (
    <Box p={3}>
      {/* Welcome Section */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent>
          <Box color="white">
            <h1 style={{ margin: 0, fontSize: '2rem' }}>Welcome to Cilantro Books 📚</h1>
            <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
              Track your reading journey and discover new books
            </p>
          </Box>
        </CardContent>
      </Card>

      {/* Statistics Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Books"
            value={totalBooks}
            icon={<MenuBookOutlined />}
            color="#667eea"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Authors"
            value={totalAuthors}
            icon={<PersonOutline />}
            color="#f093fb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Books Read"
            value={booksRead}
            icon={<TrendingUp />}
            color="#4facfe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Rating"
            value={averageRating}
            icon={<StarOutline />}
            color="#43e97b"
          />
        </Grid>
      </Grid>

      {/* Content Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <RecentBooks books={books} userBooks={userBooks} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TopGenres books={books} />
          <Box mt={3}>
            <ReadingProgress userBooks={userBooks} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};