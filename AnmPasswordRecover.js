import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';

import AuthService from "./services/auth.service";
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
        backgroundColor: '#ADD1F5',
    },
  input: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  button: {
    width: '48%',
  },
}));

export default function AnmPasswordRecover({ open, onClose }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 600, y: 450 });

  // Ref for keeping track of the form's position
  const formRef = useRef(null);

  useEffect(() => {
    // Reset the position when the form is opened
    if (open) {
      setPosition({ x: 600, y: 450 });
    }
  }, [open]);
    
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      alert("Please enter an email address");
    }
    // Handle password recovery logic here
  };

  const handleMouseDown = (event) => {
    const formRect = formRef.current.getBoundingClientRect();
    const offsetX = event.clientX - formRect.left;
    const offsetY = event.clientY - formRect.top;
    
    setIsDragging(true);
    setPosition({ x: offsetX, y: offsetY });
  };
 
  
  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.nativeEvent.offsetX - position.x,
        y: event.nativeEvent.offsetY - position.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    onClose();
  };
 
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
 
  function handleCancel() {
    setIsDragging(false);
    onClose(); // Close the password recovery component
  }

  return (
    <div 
        className={classes.root}
        style={{
            left: position.x,
            top: position.y,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        onMouseDown={handleMouseDown}    
        ref={formRef} // Attach the ref to the form container
      >
      {open && ( // Render the form only when open is true
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="black" variant="h5" align="center">
                Reset Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="email address"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCancel}
                  className={classes.button}
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}
