import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 9998, // Ensure it's on top of other content
    display: (props) => (props.show ? 'block' : 'none'),
  },
}));

const Overlay2 = () => {
  const classes = useStyles();
  return <div className={classes.overlay}></div>;
};

export default Overlay2;
