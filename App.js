import React from "react";
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { AuthContext, AuthProvider } from './AuthContext';
import MenuAppBar from './MenuAppBar';

import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    }
  }
});

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const useStyles = makeStyles((theme) => ({
      appBar: {
      paddingBottom: '15vw',
      marginBottom: '10vw',
    },
    upperBezel: {
      border: 'solid 6px #0ff',
      position: 'absolute',
      paddingTop: '0vh',
      top: '65% !important',
      left: '50%',
      topMargin: '10vh',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '60vw',
      height: 'auto',
      maxHeight: '95%',
      backgroundColor: 'white !important',
      color: 'white !important',
      [breakpoints.up('xs')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('sm')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('md')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('lg')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('xl')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
    },
    sliderBox: {
      position: 'absolute',
      paddingTop: '0vh',
      borderStyle: 'solid',
      left: '50%',
      topMargin: '10vh',
      transform: 'translateX(-50%) translateY(-50%)',
      height: '52vh',
      width: '45vh',
      maxHeight: '95%',
      backgroundColor: 'white',
      [breakpoints.up('xs')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('sm')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('md')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('lg')]: {
        height: '52vh',
        width: '45vh',
        backgroundColor: 'white',
      },
      [breakpoints.up('xl')]: {
        height: '67vh',
        width: '45vh',
        backgroundColor: 'white',
      },
    },
    image: {
      position: 'relative',
      verticalAlign: 'top',
      height: '30vh',
      width: 'auto',
      [breakpoints.up('xs')]: {
        height: '53.0vh',
        width: 'auto',
      },
      [breakpoints.up('sm')]: {
        height: '53.0vh',
        width: 'auto',
      },
      [breakpoints.up('md')]: {
        height: '52.5vh',
        width: 'auto',
      },
      [breakpoints.up('lg')]: {
        height: '54vh',
        width: '80',
      },
      [breakpoints.up('xl')]: {
        height: '66.5vh',
        width: 'auto',
      },
    },
    textAloneBox: {
      backgroundColor: "white",
      position: 'relative',
      fontSize: '1.2rem',
      textAlign: 'left',
      right: '45%',
      left: '0%',
      marginRight: '10px',
      marginLeft: '10px',
      bottom: '15%',
      verticalAlign: 'top',
      height: '30vh',
      width: 'auto',
      [breakpoints.up('xs')]: {
        height: '0vh',
        width: 'auto',
      },
      [breakpoints.up('sm')]: {
        height: '0vh',
        width: '40vh',
      },
      [breakpoints.up('md')]: {
        height: '0vh',
        width: '40vh',
      },
      [breakpoints.up('lg')]: {
        height: '0vh',
        width: '44vh',
      },
      [breakpoints.up('xl')]: {
        height: '0vh',
        width: '40vh',
      },
    },
    textAlone: {
      backgroundColor: 'white',
      fontSize: '1.2rem',
      textAlign: 'left',
      position: 'relative',
      whiteSpace: "pre-line",
      verticalAlign: "bottom",
      marginRight: '5px !important',
      marginLeft: '5px !important',
      right: '10%',
      left: '5%',
      bottom: '15%',
      color: 'black',
    },
    textOnImage: {
      fontSize: '1.2rem',
      position: 'absolute',
      textAlign: "left",
      whiteSpace: "pre-line",
      verticalAlign: "bottom",
      right: '10%',
      left: '10%',
      bottom: '15%',
      color: 'white',
    },
    titleText: {
      fontSize: '2rem',
      position: 'absolute',
      textAlign: "center",
      whiteSpace: "pre-line",
      verticalAlign: "top",
      right: '10%',
      left: '35%',
      bottom: '90%',
      color: 'black',
    },
    simple: {
      position: 'relative', 
      left: '20%',
      verticalAlign: 'bottom',
      alignItems: 'bottom',
      color: 'white',
    },
}));

const classes=useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className="App" >
      <AuthProvider>
        <MenuAppBar className={classes.appBar} title={'ANM Main'} />
      </AuthProvider>
      </div>
    </ThemeProvider>
  );
}