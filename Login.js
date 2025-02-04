// Login.js
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

import AuthService from "./services/auth.service";

import { makeStyles } from '@mui/styles';
import { TextField, Button, ButtonBase, Grid, Typography } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import AnmStyledAlert from './AnmStyledAlert';
import AnmPasswordRecover from './AnmPasswordRecover';
import AnmPasswordVerify from './AnmPasswordVerify';
import AnmPasswordReset from './AnmPasswordReset';
import AnmRegister from './AnmRegister';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    position: 'relative',
  },
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

export default function Login() {
  const classes = useStyles();
  const [showComponent, setShowComponent] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerifyOpen, setPasswordVerifyOpen] = useState(false);
  const [passwordRecoverOpen, setPasswordRecoverOpen] = useState(false);
  const [passwordResetOpen, setPasswordResetOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState(''); // Store email for verification and reset
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { setUserName, setFirstName, setIsVerified, setOwnsProduct } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }
    AuthService.login(username.trim(), password.trim(), (error, data) => {
      console.log("Login");

      if (error) {
        setIsLoggedIn(false);
        setMessage("Username / Password not valid");
        setMessageDialogOpen(true);
      } else {
        console.log("successful login", data);
        setIsLoggedIn(true);
        setUserName(data.username);
        setFirstName(data.firstname);
        setIsVerified(data.isverified);
        setOwnsProduct(data.ownsproduct);
        setShowComponent(false);
      }
    });
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setPasswordRecoverOpen(true);
    setShowComponent(false);
  };

  const handleVerificationSuccess = () => {
    setPasswordVerifyOpen(false);
    setPasswordResetOpen(true);
  };

  const handleRegister = () => {
    setRegisterDialogOpen(true);
    setShowComponent(false); // Hide login form when showing the registration form
  };

  const closeRegisterDialog = () => {
    setRegisterDialogOpen(false);
    setShowComponent(true); // Show login form again after registration
  };

  return (
    <div className={classes.root}>
      {showComponent && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <Typography color="black" variant="h5" align="center">
              Login
            </Typography>
            <TextField
              className={classes.input}
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.input}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Button
                onClick={() => setShowComponent(false)}
                className={classes.button}
                type="button"
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
            </div>
            <p></p>
            <ButtonBase className={classes.link} onClick={handleForgotPassword}>
              <Typography color="black" variant="body2" align="center">
                Forgot Password?
              </Typography>
            </ButtonBase>
            <div>
              <ButtonBase className={classes.link} onClick={handleRegister}>
                <Typography color="black" variant="body2" align="center">
                  Register new account
                </Typography>
              </ButtonBase>
            </div>
          </div>
        </form>
      )}

      {/* Registration Form */}
      {registerDialogOpen && (
        <AnmRegister
          onClose={closeRegisterDialog}
          onRegistrationSuccess={closeRegisterDialog}
        />
      )}

      {/* Password Recovery Form */}
      {passwordRecoverOpen && (
        <AnmPasswordRecover
          open={passwordRecoverOpen}
          onClose={() => {
            setPasswordRecoverOpen(false);
            setShowComponent(true);
          }}
          onSuccess={(email) => {
            setResetEmail(email);
            setPasswordRecoverOpen(false);
            setPasswordVerifyOpen(true);
          }}
        />
      )}

      {/* Password Verification Form */}
      {passwordVerifyOpen && (
        <AnmPasswordVerify
          username={resetEmail}
          onClose={() => {
            setPasswordVerifyOpen(false);
            setShowComponent(true);
          }}
          onSuccess={handleVerificationSuccess}
        />
      )}

      {/* Password Reset Form */}
      {passwordResetOpen && (
        <AnmPasswordReset
          username={resetEmail}
          onClose={() => setPasswordResetOpen(false)}
          onSuccess={() => {
            setPasswordResetOpen(false);
            setShowComponent(true);
          }}
        />
      )}

      {/* Alert Message */}
      <AnmStyledAlert
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        alertMessage={message}
      />
    </div>
  );
}
