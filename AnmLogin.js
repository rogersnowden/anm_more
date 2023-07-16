// AnmLogin
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@mui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

import  { Container, ImageList }  from '@mui/material';
import { Typography } from '@mui/material';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Axios from "axios";
import Spinner from './Spinner_ANM';

//import { useReactMediaRecorder } from "react-media-recorder";
import PlayButton from './PlayButton';
import PlayIconDisabled from './PlayButtonDisabled';
import PauseButton from './PauseButton';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import './App.css';
import "./styles.css";

const breakpoints = createBreakpoints({});

//const theme = createTheme();
const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    }
  }
});

const StyledPaper = styled(Paper)({
  backgroundColor: 'blue',
});

console.log('theme: ' + theme);

export default function AnmLogin(props) {

  console.log("props:" + props);

  const useStyles = makeStyles((theme) => ({
      appBar: {
      paddingBottom: '15vw',
      marginBottom: '10vw',
    },
    container: {
      position: 'relative',
    },
    paper: {
      backgroundColor: 'blue',
    },
    iconButton:{
      position: 'absolute',
      top: '-47% !important',
      right: '-47% !important',
      zIndex: 1,
     },
    upperBezel: {
      border: 'solid 3px #0ff',
      position: 'absolute',
      zIndex: 1,
      paddingTop: '0vh',
      top: '60% !important',
      left: '50%',
      topMargin: '10vh',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '60vw',
      height: '80vw',
      maxHeight: '95%',
      backgroundColor: 'blue',
      color: 'blue !important',
      [breakpoints.up('xs')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'green',
      },
      [breakpoints.up('sm')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'blue',
      },
      [breakpoints.up('md')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'red',
      },
      [breakpoints.up('lg')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'yellow',
      },
      [breakpoints.up('xl')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'orange',
      },
    },
      textAloneBox: {
        backgroundColor: "blue",
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
      color: 'blue',
    },
}));

// grab URI, remove trailing '/' if needed
var BaseURI = document.baseURI;
if (! BaseURI.endsWith('/'))
  {
    BaseURI = BaseURI.concat('/');
  }
//  BaseURI.replace(/\/+$/, '');

const [thisWidth, setThisWidth]= useState(window.outerWidth);

const classes=useStyles();

const instance = Axios.create({
  baseURL: window.location.href,
  timeout: 10000,
  headers: {'Access-Control-Allow-Origin': '*'},
});

const [showComponent, setShowComponent] = useState(true);
const [maxWidth, setMaxWidth] = useState();
const [maxHeight, setMaxHeight] = useState();
const [portrait, setPortrait] = useState(false);
const [isLoading, setIsLoading] = useState(false); // true for prod

const [newSlide, setNewSlide] = useState(0);
const [recText, setRecText] = useState("Record");
const [recordState, setRecordState] = useState(true);
const [isSpinning, setSpinning] = useState(false);
const [tinyDotVisible, setTinyDotVisible] = useState(false);
const [opacityStyle, setPlayOpacity] = useState(0.38);

// test axios
const j = Axios;
// cb func 

  useEffect(() => {
    setThisWidth(window.outerWidth)
    document.body.style.backgroundColor = "white";

  }, []);


  function handleCancel() {
    setShowComponent(false);
//    console.log("record cancel");
  };

  //TODO - Fix the spinner, not spinning 
  return (
    <ThemeProvider theme={theme}>
      {showComponent && (
        <div className="App">
          {isLoading ? (
            <div>
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <StyledPaper className={classes.upperBezel}  elevation={3} alignItems="center">                
              <IconButton onClick={handleCancel}  className={classes.iconButton}>
                  <CancelIcon />
                </IconButton>
              </StyledPaper >
            </React.Fragment>
          )}
        </div>
      )}
    </ThemeProvider>
  );
  
 }