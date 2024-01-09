import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

import AuthService from "./services/auth.service";
//import axios from "axios";
import { makeStyles } from '@mui/styles';
import { TextField, Button, ButtonBase, Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
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

export default function Logout() {

  const classes = useStyles();
  const [showComponent, setShowComponent] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const { setWasCancelled } = useContext(AuthContext);

  const handleLogout = (event) => {
    AuthService.logout(username.trim(), password.trim(), (error, data) =>{
      if (error) {
//        setIsLoggedIn(false);
        alert(error);
        // handle error here
      } else {
        console.log("successful logout", data);
        // set state obj to 'know' login status
        setIsLoggedIn(false);
        // close the form
        setShowComponent(false);
      }
    });
  };

  function handleCancel() {
    // do nothing but close the form
    setShowComponent(false);
    setWasCancelled(true);
  };

  return (
      <div className={classes.root}>
        {showComponent && (
        <form className={classes.form} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography color="black" variant="h5" align="center">
              Do you wish to log out?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttonContainer}>
              <Button onClick={handleLogout}
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
              >
                Logout
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
        </Grid>
      </form>
        )}
    </div>
  );
}
