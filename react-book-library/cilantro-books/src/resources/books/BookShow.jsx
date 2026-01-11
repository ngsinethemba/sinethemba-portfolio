import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
  RichTextField,
  ArrayField,
  Datagrid,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  useRecordContext,
  TopToolbar,
  ListButton,
} from 'react-admin';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Grid,
  Rating,
  Divider,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Custom Actions with Back Button
const BookShowActions = () => {
  const navigate = useNavigate();
  
  return (
    <TopToolbar>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <ListButton label="All Books" />
    </TopToolbar>
  );
};

// Custom component to display book header with cover
const BookHeader = () => {
  const record = useRecordContext();
  
  if (!record) return null;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={3}>
          {/* Book Cover */}
          <Grid item xs={12} md={3}>
            <Box
              component="img"
              src={
                record.cover_image_url ||
                'https://via.placeholder.com/300x400/e0e0e0/666666?text=No+Cover'
              }
              alt={record.title}
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>

          {/* Book Info */}
          <Grid item xs={12} md={9}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                {record.title}
              </Typography>
              
              {record.subtitle && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {record.subtitle}
                </Typography>
              )}

              {/* Rating */}
              <Box display="flex" alignItems="center" gap={2} my={2}>
                <Rating
                  value={record.average_rating || 0}
                  precision={0.1}
                  size="large"
                  readOnly
                />
                <Typography variant="h6">
                  {record.average_rating?.toFixed(1) || 'N/A'} / 5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ({record.ratings_count?.toLocaleString() || 0} ratings)
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Quick Info */}
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Published
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {record.publication_year}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Pages
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {record.pages}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    Language
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {record.language}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="body2" color="text.secondary">
                    ISBN
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {record.isbn || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>

              {/* Publisher */}
              {record.publisher && (
                <Box mt={2}>
                  <Typography variant="body2" color="text.secondary">
                    Publisher
                  </Typography>
                  <Typography variant="body1">
                    {record.publisher}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const BookShow = () => (
  <Show actions={<BookShowActions />}>
    <SimpleShowLayout>
      {/* Book Header with Cover */}
      <BookHeader />

      {/* Tabbed Content */}
      <TabbedShowLayout>
        <Tab label="Description">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About this book
              </Typography>
              <RichTextField source="description" />
            </CardContent>
          </Card>
        </Tab>

        <Tab label="Details" path="details">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Publication Details
                  </Typography>
                  <Box sx={{ '& > *': { mb: 2 } }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Genre
                      </Typography>
                      <ReferenceField source="genre_id" reference="genres" link={false}>
                        <Chip label={<TextField source="name" />} color="primary" />
                      </ReferenceField>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Publication Year
                      </Typography>
                      <NumberField source="publication_year" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Publisher
                      </Typography>
                      <TextField source="publisher" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Pages
                      </Typography>
                      <NumberField source="pages" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Language
                      </Typography>
                      <TextField source="language" />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        ISBN
                      </Typography>
                      <TextField source="isbn" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Ratings & Reviews
                  </Typography>
                  <Box sx={{ '& > *': { mb: 2 } }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Average Rating
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Rating
                          value={useRecordContext()?.average_rating || 0}
                          precision={0.1}
                          readOnly
                        />
                        <NumberField
                          source="average_rating"
                          options={{ maximumFractionDigits: 1 }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Ratings
                      </Typography>
                      <NumberField source="ratings_count" />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Tab>

        <Tab label="Authors" path="authors">
          <ReferenceManyField
            reference="book_authors"
            target="book_id"
          >
            <Datagrid bulkActionButtons={false}>
              <ReferenceField source="author_id" reference="authors" link="show" label="Name">
                <TextField source="name" />
              </ReferenceField>
              <ReferenceField source="author_id" reference="authors" link={false} label="Country">
                <TextField source="country" />
              </ReferenceField>
              <NumberField source="author_order" label="Order" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>

        <Tab label="Tags" path="tags">
          <ReferenceManyField
            reference="book_tags"
            target="book_id"
            
          >
            <Datagrid bulkActionButtons={false}>
              <ReferenceField source="tag_id" reference="tags" link={false} label="Name">
                <TextField source="name"/>
              </ReferenceField>
              <ReferenceField source="tag_id" reference="tags" link={false} label="Category" >
                <TextField source="category" />
              </ReferenceField>
            </Datagrid>
          </ReferenceManyField>
        </Tab>

        <Tab label="Reader Activity" path="activity">
          <ReferenceManyField
            reference="user_books"
            target="book_id"
            label="Readers"
          >
            <Datagrid bulkActionButtons={false}>
              <ReferenceField source="user_id" reference="users" link={false}>
                <TextField source="username" />
              </ReferenceField>
              <ReferenceField source="status_id" reference="reading_statuses" link={false}>
                <Chip
                  label={<TextField source="status_name" />}
                  size="small"
                  color="primary"
                />
              </ReferenceField>
              <DateField source="date_started" />
              <DateField source="date_finished" />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </SimpleShowLayout>
  </Show>
);