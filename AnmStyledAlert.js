import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';

import { makeStyles } from '@mui/styles';
import { TextField, Button, Grid, Typography } from '@mui/material';
import AlertMessageDialog from './AlertMessage';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%', // Adjust the vertical position
        left: '50%', // Adjust the horizontal position
        transform: 'translate(-50%, -50%)', // Center the element
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        cursor: 'grab',
        zIndex: 9999, // Ensure it's on top of other content

      },  
    form: {
        width: '300px',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(1),
        borderStyle: 'solid',
        borderWidth: '3px',
        borderColor: 'red',
        backgroundColor: '#ADD1F5',
    },
  input: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  button: {
    width: '48%',
  },
}));

export default function AnmStyledAlert({ open, onClose, alertMessage }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 600, y: 450 });
  const [initialMousePosition, setInitialMousePosition] = useState(null);
  // Ref for keeping track of the form's position
  const formRef = useRef(null);

  useEffect(() => {
    // Reset the position when the form is opened
    if (open) {
      setPosition({ x: 600, y: 450 });
    }
  }, [open]);
    
  function handleCancel() {
//    setIsDragging(false);
    onClose(); // Close the password recovery component
  }

  return (
    <div className={classes.root} style={{ left: position.x, top: position.y }}>
        {open && (
            <div className={classes.form} ref={formRef}>
                <div // This div serves as the title bar or drag handle
                    style={{ padding: '10px' }}
                >
                    <Typography color="black" variant="h6" align="center">
                        {alertMessage}
                    </Typography>
                </div>
                <form >
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={handleCancel}
                  className={classes.button}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Close
                </Button>
              </div>
            </Grid>
                </form>
            </div>
        )}
    </div>
);
}
