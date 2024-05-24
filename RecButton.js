// RecButton.js
import React from 'react';
import Button from '@mui/material/Button';

const RecButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Record
    </Button>
  );
};

export default RecButton;
