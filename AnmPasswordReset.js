import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthService from './services/auth.service';
import AnmStyledAlertTimed from './AnmStyledAlertTimed';
import Overlay from './Overlay';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ADD1F5',
    position: 'relative',
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

export default function AnmPasswordReset({ username, onClose, onSuccess }) {
  console.log("AnmPasswordReset");

  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertTimed, setAlertTimed] = useState(false);
  const [alertTimedMessage, setAlertTimedMessage] = useState('');

  const handlePasswordReset = () => {
    if (!password || !confirmPassword) {
      setErrorMessage('Both fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Call server to reset the password
    AuthService.pwdset(null, username, password, (error) => {
      if (error) {
        setErrorMessage('Failed to reset password. Please try again.');
      } else {
        setAlertTimedMessage('Password Reset. Please log in.');
        setAlertTimed(true); // Show overlay and timed alert
        setTimeout(() => {
          setAlertTimed(false); // Close the alert after 3 seconds
          onSuccess(); // Notify parent and return to login
        }, 3000);
      }
    });
  };

  return (
    <>
      <Overlay show={alertTimed} />
      <div className={classes.form}>
        <Typography variant="h5" align="center">
          Reset Password
        </Typography>
        <TextField
          className={classes.input}
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errorMessage}
        />
        <TextField
          className={classes.input}
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Grid item xs={12}>
          <div className={classes.buttonContainer}>
            <Button
              onClick={handlePasswordReset}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Reset
            </Button>
            <Button
              onClick={onClose}
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </div>
      <AnmStyledAlertTimed
        open={alertTimed}
        onClose={() => setAlertTimed(false)}
        alertMessage={alertTimedMessage}
      />
    </>
  );
}
