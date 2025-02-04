import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AuthService from './services/auth.service';
import AnmPasswordVerify from './AnmPasswordVerify';
import AnmStyledAlert from './AnmStyledAlert';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '300px',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    backgroundColor: '#ADD1F5',
    position: 'relative',
    zIndex: 10,
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

export default function AnmRegister({ onClose, onRegistrationSuccess }) {
  console.log("AnmRegister");
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '',
    phonenumber: '',
    firstname: '',
    lastname: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = (data) => {
    const errors = {};
    const phoneRegex = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;

    if (!data.username) errors.username = 'Email address is required.';
    if (!data.phonenumber || !phoneRegex.test(data.phonenumber)) errors.phonenumber = 'Valid phone number is required.';
    if (!data.firstname) errors.firstname = 'First name is required.';
    if (!data.lastname) errors.lastname = 'Last name is required.';
    if (!data.password) errors.password = 'Password is required.';
    if (data.password !== data.password2) errors.password2 = 'Passwords must match.';

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      AuthService.register(
        formData.username.trim(),
        formData.firstname.trim(),
        formData.lastname.trim(),
        formData.phonenumber.trim(),
        formData.password.trim(),
      )
        .then(() => {
          setVerificationStep(true);
//          setAlertMessage('Verification code sent to your email. Please enter it below.');
//          setShowAlert(true);
        })
        .catch((error) => {
          setAlertMessage(error.message || 'Registration failed.');
          setShowAlert(true);
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleVerificationSuccess = () => {
//    setAlertMessage('Registration successful! You can now log in.');
//    setShowAlert(true);
    setTimeout(() => {
      onRegistrationSuccess();
    }, 3000);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      {!verificationStep ? (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h5" color="black" align="center">
            Register New User
          </Typography>
          <TextField
            className={classes.input}
            label="Email Address"
            name="username"
            variant="outlined"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            helperText={formErrors.username}
          />
          <TextField
            className={classes.input}
            label="First Name"
            name="firstname"
            variant="outlined"
            fullWidth
            value={formData.firstname}
            onChange={handleChange}
            error={!!formErrors.firstname}
            helperText={formErrors.firstname}
          />
          <TextField
            className={classes.input}
            label="Last Name"
            name="lastname"
            variant="outlined"
            fullWidth
            value={formData.lastname}
            onChange={handleChange}
            error={!!formErrors.lastname}
            helperText={formErrors.lastname}
          />
          <TextField
            className={classes.input}
            label="Phone Number"
            name="phonenumber"
            variant="outlined"
            fullWidth
            value={formData.phonenumber}
            onChange={handleChange}
            error={!!formErrors.phonenumber}
            helperText={formErrors.phonenumber}
          />
          <TextField
            className={classes.input}
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
          />
          <TextField
            className={classes.input}
            label="Confirm Password"
            name="password2"
            type="password"
            variant="outlined"
            fullWidth
            value={formData.password2}
            onChange={handleChange}
            error={!!formErrors.password2}
            helperText={formErrors.password2}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.button}
                onClick={handleCancel}
                variant="contained"
                color="secondary"
                fullWidth
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      ) : (
        <AnmPasswordVerify
          username={formData.username}
          onClose={handleCancel}
          onSuccess={handleVerificationSuccess}
        />
      )}

      <AnmStyledAlert
        open={showAlert}
        color="black"
        onClose={() => setShowAlert(false)}
        alertMessage={alertMessage}
      />
    </>
  );
}
