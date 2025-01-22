import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Typography, Grid } from '@mui/material';
import AuthService from './services/auth.service';
import { AuthContext } from './AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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

export default function AnmPasswordRecover({ open, onClose, onSuccess }) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    AuthService.pwdreset(username.trim(), (error, data) => {
      setIsSubmitting(false);
      if (error) {
        console.error('Password reset request failed:', error);
        setErrorMessage('Reset failed. Please check the email address and try again.');
      } else {
        console.log('Password reset email sent successfully:', data);
//        alert('Password reset email sent. Please check your inbox.');
        onSuccess(username); // Notify the parent component of success
      }
    });
  };

  const handleCancel = () => {
    setErrorMessage('');
    onClose(); // Close the password recovery form
  };

  return (
    open && (
      <div className={classes.root}>
        <div className={classes.form}>
          <Typography color="black" variant="h5" align="center">
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              label="Email Address"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errorMessage}
              helperText={errorMessage}
            />
            <Grid item xs={12}>
              <div className={classes.buttonContainer}>
                <Button
                  onClick={handleSubmit}
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button
                  onClick={handleCancel}
                  className={classes.button}
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    )
  );
}
