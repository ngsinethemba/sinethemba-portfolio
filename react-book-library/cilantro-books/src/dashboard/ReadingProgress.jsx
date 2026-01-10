import React from 'react';
import { Card, CardContent, CardHeader, Box, Typography, LinearProgress } from '@mui/material';

export const ReadingProgress = ({ userBooks }) => {
  const total = userBooks?.length || 0;
  const completed = userBooks?.filter((ub) => ub.status_id === 3).length || 0;
  const reading = userBooks?.filter((ub) => ub.status_id === 2).length || 0;
  const toRead = userBooks?.filter((ub) => ub.status_id === 1).length || 0;

  const completedPercent = total > 0 ? (completed / total) * 100 : 0;

  return (
    <Card>
      <CardHeader title="Reading Progress" />
      <CardContent>
        <Box mb={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">Completed</Typography>
            <Typography variant="body2" fontWeight="bold">
              {completed} / {total}
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={completedPercent}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box display="flex" justifyContent="space-around" mt={3}>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" color="primary">
              {reading}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Reading
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" color="secondary">
              {toRead}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              To Read
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h5" fontWeight="bold" color="success.main">
              {completed}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Done
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
