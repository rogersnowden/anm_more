import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: '35%',
    height: '35%',
    position: 'fixed',
    top: '50%',
    bottom: '50%',
    transform: 'translate(50%, 50%)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1), // Customize the corner shape
    backgroundColor: '#cee0f2',
    boxShadow: theme.shadows[5], // Add a shadow effect  
    },
  container: {
    backgroundColor: '#cee0f2', // Set background color for the entire container
    padding: theme.spacing(3),
    margin: 0,
//    borderRadius: theme.spacing(4), // Customize the corner shape
    boxShadow: theme.shadows[5], // Add a shadow effect  
    },
  message: {
    backgroundColor: '#cee0f2',
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2), // Customize the corner shape
    fontSize: '16px', // Adjust the font size as needed
    fontWeight: 'bold',
    color: '#333', // Adjust the text color
    fontFamily: 'Arial, sans-serif', // Adjust the font family
    lineHeight: '1.5', // Adjust the line height for better readability
            },
  buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#cee0f2',
        padding: theme.spacing(1, 2), // Add padding to the button container
      },
  button: {
    width: '48%',
    backgroundColor: '#cee0f2',
    marginLeft: theme.spacing(1),
  },
  golbalBoxSizing: {
    '*': {
      boxSizing: 'border-box',
    },
  },
}));

const AlertMessageDialog = ({ open, onClose, message }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} className={classes.globalBoxSizing}>
      <div className={classes.container}>
        <p className={classes.message}>{message}</p>
        <DialogActions className={classes.buttonContainer}>
          <Button
            className={classes.button}
            onClick={onClose}
            color="primary"
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AlertMessageDialog;
