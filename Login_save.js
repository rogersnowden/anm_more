import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

import AuthService from "./services/auth.service";
//import axios from "axios";
import { makeStyles } from '@mui/styles';
import { TextField, Button, ButtonBase, Grid, Typography } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import AnmPasswordRecover from './AnmPasswordRecover';
import AnmRegister from './AnmRegister';
import AlertMessageDialog from './AlertMessage';
import Overlay from './Overlay';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
//    zIndex: 9997,
    position: 'relative',
  },
  form: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ADD1F5',
    zIndex: '9997 !important',
    position: 'relative !important',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
  },
  // make sure dialog is always on top
  dialog: {
    zIndex: '10000 !important',
    position: 'relative !important',
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
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [passwordRecoverOpen, setPasswordRecoverOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password");
    }
    AuthService.login(username.trim(), password.trim(), (error, data) =>{
      if (error) {
        setIsLoggedIn(false);
        setMessage("Username / Password not valid");
        setMessageDialogOpen(true);
  // handle error here
      } else {
        console.log("successful login", data);
        setIsLoggedIn(true);
        // now turn off the form, we are done
        setShowComponent(false);
      }
    });
  };

  function handleCancel() {
    setShowComponent(false);
//    console.log("record cancel");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault(); 
    setPasswordRecoverOpen(true);
    // Handle logic here
  };

  const handleRegister = (event) => {
//    event.preventDefault();
    setRegisterDialogOpen(true);
  };

  const closeRegisterDialog = () => {
    setRegisterDialogOpen(false);
  };

  return (
      <div className={classes.root}>
        {showComponent && (
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="black" variant="h5" align="center">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.input}
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Login
              </Button>
              <Button onClick={handleCancel}
                className={classes.button}
                type="button"
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase className={classes.link} onClick={handleForgotPassword}>
              <Typography color="black" variant="body2" align="center">
                Forgot Password?
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item xs={12}>
            <ButtonBase className={classes.link} onClick={handleRegister}>
              <Typography color="black" variant="body2" align="center">
                Register new account
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </form>
        )}
      <AlertMessageDialog 
        className={classes.dialog}
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        message= {message}
      />
      <div>
        <Overlay show={passwordRecoverOpen} />
        <AnmPasswordRecover
          open={passwordRecoverOpen}
          onClose={() => setPasswordRecoverOpen(false)}
        /> 
      </div>  
      {
        registerDialogOpen && (
          <>
          <Overlay show={registerDialogOpen} />
          <AnmRegister onClose={() => setRegisterDialogOpen(false)} />
          </>
        )
      }
    </div>
  );
}
