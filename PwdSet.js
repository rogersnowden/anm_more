import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
    zIndex: 9997,
  },
  form: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ADD1F5',
    zIndex: 9997,
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

export default function PwdSet(props) {

    const params = useParams();
    const token = params.token;

  const classes = useStyles();
  const [showComponent, setShowComponent] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  // State to hold the form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [errormessage, setErrormessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validate the form
    const errors = validateForm(formData);
    setFormErrors(errors);
  
    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
      AuthService.pwdset(
        token,
        formData.username.trim(),
        formData.password.trim(),
        (error, data) => {
          if (error) {
            console.error(error);
            // Handle the error
          } else {
            console.log(data);
            // Handle the successful case
          }
        })
        .then((data) => {
          console.log("reset", data);
          setIsLoggedIn(true);
          setShowComponent(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);

          // Check if the error message is "User already exists"
          if (error.message === 'expired token') {
            // If it is, show the pop-up dialog
//            setExistingUserDialogueOpen(true);
              setMessage("Password reset timed out, please try again");
              setMessageDialogOpen(true);
          } else {
            // Handle other error cases if needed
            setErrormessage(error.message);
          }
        });
    }
  };

  const validateForm = (data) => {
    const errors = {};
    // Validate username, password, and other fields here...
    if (!data.username) {
      errors.username = 'Please enter a username (email address).';
    }
    if (!data.password) {
      errors.password = 'Please enter a password.';
    }
    if (data.password !== data.password2) {
      errors.password2 = 'Passwords do not match.';
    }
    return errors;
  };

  function handleCancel() {
    setShowComponent(false);
//    console.log("record cancel");
  };


  return (
    <div className={classes.root}>
      {showComponent && (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="black" variant="h5" align="center">
                Create New Password
              </Typography>
            </Grid>
            {formErrors.username && (
              <Grid item xs={12}>
                <ErrorMessage message={formErrors.username} />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Username (email address)"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(formErrors.username)}
              />
            </Grid>
            {formErrors.password && (
              <Grid item xs={12}>
                <ErrorMessage message={formErrors.password} />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(formErrors.password)}
              />
            </Grid>
            {formErrors.password2 && (
              <Grid item xs={12}>
                <ErrorMessage message={formErrors.password2} />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                label="Reenter Password"
                variant="outlined"
                fullWidth
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                error={Boolean(formErrors.password2)}
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
      <AlertMessageDialog 
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        message= {message}
      />      
    </div>
  );}
