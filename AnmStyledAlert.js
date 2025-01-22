// AnmStyledAlert -- common form for alerts, must be dismissed
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the element
    zIndex: 9999,
    width: '90%', // Take up 90% of the screen width for smaller devices
    maxWidth: '400px', // Constrain the max width
    backgroundColor: '#ADD1F5',
    border: '3px solid red',
    borderRadius: '8px',
    padding: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  button: {
    minWidth: '100px',
  },
}));

export default function AnmStyledAlert({ open, onClose, alertMessage }) {
  const classes = useStyles();

  if (!open) return null; // Don't render if not open

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">
        {alertMessage}
      </Typography>
      <div className={classes.buttonContainer}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </div>
    </div>
  );
}
