import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Box } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the element
    zIndex: 9999,
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#ADD1F5',
    border: '3px solid red',
    borderRadius: '8px',
    padding: '16px',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
  square: {
    width: '20px',
    height: '20px',
    backgroundColor: '#007BFF', // Blue color for the squares
    margin: '0 4px',
    borderRadius: '4px', // Optional for rounded corners
  },
}));

export default function AnmStyledAlertTimed({ open, onClose, alertMessage }) {
  const classes = useStyles();
  const [remainingSquares, setRemainingSquares] = useState([]);

  useEffect(() => {
    if (open) {
      const totalDuration = 3; // Total duration in seconds
      const squares = Array(totalDuration).fill(null); // Array with one square per second
      setRemainingSquares(squares);

      let currentSquare = totalDuration;
      const interval = setInterval(() => {
        currentSquare -= 1;
        setRemainingSquares((prev) => prev.slice(0, -1)); // Remove one square
        if (currentSquare <= 0) {
          clearInterval(interval);
          onClose(); // Close the alert when the timer ends
        }
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={classes.root}>
      <Typography variant="h6" align="center">
        {alertMessage}
      </Typography>
      <Box className={classes.progressBar}>
        {remainingSquares.map((_, index) => (
          <div key={index} className={classes.square}></div>
        ))}
      </Box>
    </div>
  );
}
