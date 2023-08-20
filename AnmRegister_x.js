import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import ErrorMessage from './ErrorMessage';
//import ExistingUserDialogue from './ExistingUserDialogue';
import AlertMessageDialog from './AlertMessage';
import Overlay from './Overlay';

import AuthService from "./services/auth.service";
//import axios from "axios";
import { makeStyles } from '@mui/styles';
import { TextField, Button, ButtonBase, Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  overlayRoot: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    cursor: 'grab',
    zIndex: 9999, // Ensure it's on top of other content
    // ... other overlay specific styles
  },
  fullScreenRoot: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    // ... other full-screen specific styles
  },

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
  formPopup: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    border: '3px solid #B71C1C',
    backgroundColor: '#ADD1F5',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
  },
  messagebox: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(1),
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

export default function AnmRegister({ isPopup, onClose }) {
//isPopup= true;
  const classes = useStyles();

  // state stuff here
  const [showComponent, setShowComponent] = useState(true);
  // State to hold the form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    phonenumber: '',
    firstname: '',
    lastname: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const [phoneError, setPhoneError] = useState('');
  const [errormessage, setErrormessage] = useState();
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [existingUserDialogueOpen, setExistingUserDialogueOpen] = useState(false);

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
      AuthService.register(
        formData.username.trim(),
        formData.password.trim(),
        formData.firstname.trim(),
        formData.lastname.trim(),
        formData.phonenumber.trim()
      )
        .then((data) => {
          console.log("successful registration", data);
          setIsLoggedIn(true);
          setShowComponent(false);
        })
        .catch((error) => {
          setIsLoggedIn(false);

          // Check if the error message is "User already exists"
          if (error.message === 'User already exists') {
            // If it is, show the pop-up dialog
//            setExistingUserDialogueOpen(true);
              setMessage("User Already Exists");
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
    // Regular expression for US phone number validation.
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
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
    if (!phoneRegex.test(data.phonenumber)) {
      errors.phonenumber = 'Please enter a valid US phone number.';
    }

    // Add more validation rules for other fields if needed...

    return errors;
  };

  function handleCancel() {
    setShowComponent(false);
//    console.log("record cancel");
  };


  return (
    <React.Fragment>
      {isPopup && <Overlay className={classes.overlayRoot} show={showComponent} />}
      {showComponent && (
        <div className={isPopup ? classes.overlayRoot : classes.fullScreenRoot}> 
          <form className={ isPopup? classes.formPopup : classes} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="black" variant="h5" align="center">
                  Register New User
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
              {formErrors.phonenumber && (
                <Grid item xs={12}>
                  <ErrorMessage message={formErrors.phonenNumber} />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  error={Boolean(formErrors.phonenumber)}
                />
              </Grid>
              {/* Add error display for other fields as needed... */}
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.input}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
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
        </div>
      )}
      <AlertMessageDialog 
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        message={message}
      />
    </React.Fragment>
  );
  }
