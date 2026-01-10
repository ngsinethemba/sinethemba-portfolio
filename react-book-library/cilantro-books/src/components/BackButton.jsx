import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ label = 'Back', ...props }) => {
  const navigate = useNavigate();
  
  return (
    <Button
      startIcon={<ArrowBack />}
      onClick={() => navigate(-1)}
      sx={{ mr: 1 }}
      {...props}
    >
      {label}
    </Button>
  );
};