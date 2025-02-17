// AnmPasswordVerify
import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthService from './services/auth.service';
//import AnmStyledAlertTimed from './AnmStyledAlertTimed';

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

export default function AnmPasswordVerify({ username, onClose, onSuccess }) {
  console.log("AnmPasswordVerify begin");

  const classes = useStyles();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [alertTimed, setAlertTimed] = useState(false);
  const [alertTimedMessage, setAlertTimedMessage] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setUserName, setFirstName, setIsVerified, setOwnsProduct } = useContext(AuthContext);
  

  const handleVerify = () => {
    if (!code) {
      setErrorMessage('Please enter the 6-digit code.');
      return;
    }

    // Call server to verify the code
    console.log("AnmPasswordVerify calling verifyRegistrationCode");
    console.log("username: " + username);
    AuthService.verifyRegistrationCode(username, code, (error) => {
      if (error) {
        setErrorMessage('Invalid or expired code. Please try again.');
      } else {
        //set logged in so MenuAppBar will initialize login stuff
        console.log("AnmPasswordVerify, setting setUserName: " + username);
        setIsLoggedIn(true);
        setUserName(username);
//        setAlertTimedMessage('Account Verified. Logging in now.');
//        setAlertTimed(true); // Show overlay and timed alert
//        setTimeout(() => {
//          setAlertTimed(false); // Close the alert after 3 seconds
//          onSuccess(); // Notify parent and return to login
//        }, 3000);
      onSuccess();
      }
    });
  };

  return (
    <div className={classes.form}>
      <Typography variant="h5" color="black" align="center">
        Enter Verification Code
      </Typography>
      <Typography variant="h5" color="black" align="center">
        sent to your email address
      </Typography>
      <TextField
        className={classes.input}
        label="6-Digit Code"
        variant="outlined"
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!errorMessage}
        helperText={errorMessage}
      />
      <Grid item xs={12}>
        <div className={classes.buttonContainer}>
          <Button
            onClick={handleVerify}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Verify
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
  );
}
