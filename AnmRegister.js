import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import ErrorMessage from './ErrorMessage';
//import ExistingUserDialogue from './ExistingUserDialogue';
//import AlertMessageDialog from './AlertMessage';
import AnmStyledAlert from './AnmStyledAlert';

//import Overlay from './Overlay';

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
    position: 'fixed',
    top: '10%',
    left: '35%',
    zIndex: 9999,
  },
  form: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ADD1F5',

  },
  overlayForm: {
    zIndex: 9998,
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

export default function AnmRegister({onClose, onRegistrationSuccess}) {
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
  // this controls alert dismissal, success/failure
  const [isSuccessAlert, setIsSuccessAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn} = useContext(AuthContext);
  const [existingUserDialogueOpen, setExistingUserDialogueOpen] = useState(false);

  //debug code for overlay handling diag
  useEffect(() => {
    console.log("Comp updated. Overlay open: ", overlayOpen);
    return() => {
      console.log("Component unmounting");
    };
  }, [overlayOpen]);


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
          setIsLoggedIn(false);//seems odd, but need to login again
          setMessage("New Registration successful, please log in");
          setMessageDialogOpen(true);
          setOverlayOpen(true);
          setShowComponent(false); // after popup dismissed, dismiss 'this'
          setIsSuccessAlert(true);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsSuccessAlert(false);

          // Check if the error message is "User already exists"
          if (error.message === 'User already exists') {
            // If it is, show the pop-up dialog
//            setExistingUserDialogueOpen(true);
              setMessage("User Already Exists");
              setMessageDialogOpen(true);
              setOverlayOpen(true);
          } else {
            // Handle other error cases if needed
            setMessage(error.message);
            setMessageDialogOpen(true);
            setOverlayOpen(true);
          }
        });
    }
  };

  const closeAlert = () => {
//    setOverlayOpen(false);
    if (isSuccessAlert) {
      onRegistrationSuccess();
    }
    setMessageDialogOpen(false);
  }

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
    onClose();
//    console.log("record cancel");
  };


  return (
    <div className={classes.root}>
      {showComponent && (
        <form className={classes.form} onSubmit={handleSubmit}>
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
      )}
      <div>
        <AnmStyledAlert
          open={messageDialogOpen}
          onClose={closeAlert}
          alertMessage={message}
        />
      </div>
    </div>
  );
}
