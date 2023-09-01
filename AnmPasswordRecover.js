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
  const [initialMousePosition, setInitialMousePosition] = useState(null);
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
    AuthService.pwdreset(username.trim(), (error, data) =>{
      if (error) {
        setMessage("reset failed");
        setMessageDialogOpen(true);
  // handle error here
      } else {
        console.log("successful pwdreset", data);
        // now turn off the form, we are done
      }
    });
  };

  const handleMouseDown = (event) => {
    const formRect = formRef.current.getBoundingClientRect();
    const offsetX = event.clientX - formRect.left;
    const offsetY = event.clientY - formRect.top;
    
    setIsDragging(true);
    setInitialMousePosition({ x: event.clientX, y: event.clientY });
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

  const handleMouseUp = (event) => {
    if (initialMousePosition.x === event.clientX && initialMousePosition.y === event.clientY) {
      // This means the mouse hasn't moved between mousedown and mouseup events, so we shouldn't close the form.
      setIsDragging(false);
      } else {
          setIsDragging(false);
          onClose();
      }
  };
 
  //useEffect(() => {
  //  if (isDragging) {
  //    window.addEventListener('mousemove', handleMouseMove);
  //    window.addEventListener('mouseup', handleMouseUp);
  //  } else {
  //    window.removeEventListener('mousemove', handleMouseMove);
  //    window.removeEventListener('mouseup', handleMouseUp);
  //  }
  //  return () => {
  //    window.removeEventListener('mousemove', handleMouseMove);
  //    window.removeEventListener('mouseup', handleMouseUp);
  //  };
  //}, [isDragging]);
 
  function handleCancel() {
//    setIsDragging(false);
    onClose(); // Close the password recovery component
  }

  return (
    <div className={classes.root} style={{ left: position.x, top: position.y }}>
        {open && (
            <div className={classes.form} ref={formRef}>
                <div // This div serves as the title bar or drag handle
                    style={{ cursor: isDragging ? 'grabbing' : 'grab', backgroundColor: 'lightgray', padding: '10px' }}
                    onMouseDown={handleMouseDown}
                >
                    <Typography color="black" variant="h5" align="center">
                        Reset Password
                    </Typography>
                </div>
                <form >
                              <Typography color="black" variant="h5" align="center">
                  </Typography>
                  <TextField
                      className={classes.input}
                      label="email address"
                      variant="outlined"
                      fullWidth
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={handleSubmit}
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
                </form>
            </div>
        )}
    </div>
);
}
