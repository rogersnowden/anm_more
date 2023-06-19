 // AnmLogin
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@mui/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

//import Button from '@mui/material/Button';

import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
//import Grid from '@mui/material/Grid';
import { Grid, Box, Button, InputLabel, Input } from '@mui/material';
import Axios from "axios";
import Spinner from './Spinner_ANM';

import './App.css';

const breakpoints = createBreakpoints({});

//const theme = createTheme();
const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    }
  }
});

console.log('theme: ' + theme);

const useStyles = makeStyles((theme) => ({
    clickableLink: {
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },    
    centeredInput: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        '& input': {
          textAlign: 'center',
        },
        '&::placeholder': {
          textAlign: 'center',
        },
      },
      loginPanel: {
      border: 'solid 3px #0ff',
      borderRadius: '20px',
      position: 'absolute',
      paddingTop: '0vh',
      top: '60% !important',
      left: '50%',
      topMargin: '10vh',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '60vw',
      height: '60vw',
      maxHeight: '95%',
      backgroundColor: '#B3E5FC',
      color: 'white !important',
      [breakpoints.up('xs')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderRadius: '20px',
        borderColor: 'green',
        backgroundColor: '#B3E5FC',
      },
      [breakpoints.up('sm')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderRadius: '20px',
        borderColor: 'blue',
        backgroundColor: '#B3E5FC',
      },
      [breakpoints.up('md')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderRadius: '20px',
        borderColor: 'red',
        backgroundColor: '#B3E5FC',
      },
      [breakpoints.up('lg')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderRadius: '20px',
        borderColor: 'black',
        backgroundColor: '#B3E5FC',
      },
      [breakpoints.up('xl')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderRadius: '20px',
        borderColor: 'orange',
        backgroundColor: '#B3E5FC',
      },
    },
}));

export default function AnmLogin({onClose}) {

// grab URI, remove trailing '/' if needed
var BaseURI = document.baseURI;
if (! BaseURI.endsWith('/'))
  {
    BaseURI = BaseURI.concat('/');
  }
//  BaseURI.replace(/\/+$/, '');

const [thisWidth, setThisWidth]= useState(window.outerWidth);
const [isComponentVisible, setComponentVisible]= useState(true);


const classes=useStyles();

const instance = Axios.create({
  baseURL: window.location.href,
  timeout: 10000,
  headers: {'Access-Control-Allow-Origin': '*'},
});

const UserBase = "cust/users/thisUser/collection/thisBook/";

const [maxWidth, setMaxWidth] = useState();
const [maxHeight, setMaxHeight] = useState();
const [portrait, setPortrait] = useState(false);
const [isLoading, setIsLoading] = useState(true);

const [isSpinning, setSpinning] = useState(false);
const [tinyDotVisible, setTinyDotVisible] = useState(false);

// test axios
const j = Axios;

function handleSubmit() {
    console.log('submit here');
}
function handleCancel() {
    console.log('cancel here');
    onClose();
}

function handleLostPassword() {
    console.log('lost pwd');
}

function handleRegister() {
    console.log('register');
}


useEffect(() => {
      setThisWidth(window.outerWidth)
      document.body.style.backgroundColor = "white";

    }, []);

  useEffect(() => {
    setThisWidth(window.outerWidth)
    document.body.style.backgroundColor = "white";

  }, []);

  if (!isComponentVisible) {
    return null; // or any other component or null to hide the component
  }

  //TODO - Fix the spinner, not spinning 
  return (
    <div className="Login">
      <Box className={classes.loginPanel} alignItems="center">
      <div> <h2 style={{color: 'black'}}>Login</h2></div>
        <Box marginBottom={2} >
          <Input
            id="username"
            type="username"
            required
            placeholder="username"
            className={classes.centeredInput}
            sx={{
                textAlign: { xs: 'center', sm: 'left' },
              }}          />
        </Box>
        <Box marginBottom={2} >
          <Input
            id="password"
            type="password"
            required
            placeholder="password"
            className={classes.centeredInput}
            sx={{
                textAlign: { xs: 'center', sm: 'left' },
              }}          />
          </Box>
        <Grid container direction="column" justify="space-between" alignItems="center" style={{ height: '100%' }}>
          <Grid item>
            <Grid container spacing={2} justify="center" style={{ marginTop: 'auto' }}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}   sx={{
    width: { xs: '100%', sm: 'auto' },
    mb: 2,
    mr: { xs: 0, sm: 1 },
  }}>
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleCancel}   sx={{
    width: { xs: '100%', sm: 'auto' },
    mb: 2,
    mr: { xs: 0, sm: 1 },
  }}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: '25px' }}>
          <Typography variant="body1" color="darkorange" onClick={handleLostPassword}
            className={classes.clickableLink}
            style={{ fontSize: '24px', color: '#FF4500'  }}
            sx={{
                fontSize: { xs: '20px', sm: '24px' },
             }}
            >
                  forgot password?
          </Typography>
          </Grid>
          <Grid item style={{ marginTop: '20px' }}>
          <Typography variant="body1" color="darkorange" onClick={handleRegister} 
            className={classes.clickableLink}
            style={{ fontSize: '24px', color: '#FF4500' }}
            sx={{
                fontSize: { xs: '20px', sm: '24px' },
              }}>
                  register new account
          </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
  
   }