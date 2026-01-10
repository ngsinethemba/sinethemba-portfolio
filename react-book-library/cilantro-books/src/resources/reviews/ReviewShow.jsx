import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  ReferenceField,
  DateField,
  BooleanField,
  RichTextField,
} from 'react-admin';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Rating as MuiRating,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { ThumbUp, Warning } from '@mui/icons-material';

export const ReviewShow = () => (
  <Show>
    <SimpleShowLayout>
      {/* Book and User Info */}
      <Box sx={{ mb: 3 }}>
        <ReferenceField source="user_book_id" reference="user_books" label="">
          <ReferenceField source="book_id" reference="books" link="show">
            <TextField
              source="title"
              sx={{ fontSize: '1.8rem', fontWeight: 'bold', mb: 1 }}
            />
          </ReferenceField>
        </ReferenceField>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="textSecondary">
            Review by
          </Typography>
          <ReferenceField source="user_book_id" reference="user_books" label="">
            <ReferenceField source="user_id" reference="users" link={false}>
              <Chip
                label={<TextField source="username" />}
                size="small"
                color="primary"
              />
            </ReferenceField>
          </ReferenceField>
          <DateField source="review_date" />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Rating */}
      <Box sx={{ my: 3 }}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Rating
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <NumberField
            source="rating"
            render={(record) => (
              <MuiRating value={record.rating} readOnly size="large" />
            )}
          />
          <Typography variant="h5" fontWeight="bold">
            <NumberField source="rating" /> / 5
          </Typography>
        </Box>
      </Box>

      {/* Spoiler Warning */}
      <BooleanField
        source="is_spoiler"
        render={(record) =>
          record.is_spoiler ? (
            <Alert severity="warning" icon={<Warning />} sx={{ mb: 2 }}>
              This review contains spoilers!
            </Alert>
          ) : null
        }
      />

      {/* Review Text */}
      <Card variant="outlined" sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Review
          </Typography>
          <RichTextField source="review_text" />
        </CardContent>
      </Card>

      {/* Engagement */}
      <Box display="flex" alignItems="center" gap={1} mt={2}>
        <ThumbUp color="action" fontSize="small" />
        <NumberField source="likes_count" label="people found this helpful" />
      </Box>
    </SimpleShowLayout>
  </Show>
);