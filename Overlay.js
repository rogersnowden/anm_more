import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 9998, // Ensure it's on top of other content
  },
}));

const Overlay = ({ show }) => {
  const classes = useStyles();
  if (!show) return null;
  return <div className={classes.overlay}></div>;
};

export default Overlay;
