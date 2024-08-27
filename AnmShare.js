// AnmShare js
import React, { useState, useEffect, useRef, useContext } from "react";
import ProdService from "./services/prod.service";
import { AuthContext } from './AuthContext';
import { makeStyles } from '@mui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import  { Container, ImageList }  from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Spinner from './Spinner_ANM';

import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

import './App.css';
import "./styles.css";
import prodService from "./services/prod.service";
import { ContentCutOutlined } from "@mui/icons-material";

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

//export default function AnmRecord({ userName, productSKU }) {
export default function AnmShare({userName, productSKU}) {

  //console.log("userName: " + userName + " prodsku: " + productSKU)
  const API_URL = "https://localhost:4000/api/";
  const THIS_BOOK_URL = API_URL + 'users/' + userName + '/mybooks/'  
  + productSKU + '/';


  const useStyles = makeStyles((theme) => ({
      appBar: {
      paddingBottom: '15vw',
      marginBottom: '10vw',
    },
    container: {
      position: 'relative',
    },
    iconButton:{
      position: 'absolute',
      top: '-47% !important',
      right: '-47% !important',
      zIndex: 1,
     },
     upperBezel: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '35vw', // Width as viewport width
      height: '52vw', // Height adjusted to maintain 4:3 aspect ratio
      border: 'solid 3px #0ff',
      backgroundColor: 'white',
      zIndex: 3,
      [breakpoints.up('xs')]: {
        top: '50% !important',
        left: '50%',
        height: '52vh',
        width: '45vh',
        borderColor: 'green',
        backgroundColor: 'white',
      },
      [breakpoints.up('sm')]: {
        top: '50% !important',
        left: '50%',
        height: '52vh',
        width: '45vh',
        borderColor: 'blue',
        backgroundColor: 'white',
      },
      [breakpoints.up('md')]: {
        top: '52% !important',
        left: '50%',
        height: '52vh',
        width: '45vh',
        borderColor: 'red',
        backgroundColor: 'white',
      },
      [breakpoints.up('lg')]: {
        top: '50% !important',
        left: '50%',
        height: '52vh',
        width: '45vh',
        borderColor: 'yellow',
        backgroundColor: 'white',
      },
      [breakpoints.up('xl')]: {
        top: '50% !important',
        left: '40%',
        height: '52vh',
        width: '45vh',
        borderColor: 'orange',
        backgroundColor: 'white',
      },
    },
    image: {
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover', // Cover to ensure aspect ratio is maintained
      objectPosition: 'center', // Center the image within its container
      [breakpoints.up('xs')]: {
        height: '100%',
        width: '100%',
      },
      [breakpoints.up('sm')]: {
        height: '100%',
        width: '100%',
      },
      [breakpoints.up('md')]: {
        height: '100%',
        width: '100%',
      },
      [breakpoints.up('lg')]: {
        height: '100%',
        width: '100%',
      },
      [breakpoints.up('xl')]: {
        height: '100%',
        width: '100%',
      },
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

// grab URI, remove trailing '/' if needed
var BaseURI = document.baseURI;
if (! BaseURI.endsWith('/'))
  {
    BaseURI = BaseURI.concat('/');
  }

const [thisWidth, setThisWidth]= useState(window.outerWidth);

const classes=useStyles();


const UserBase = "cust/users/thisUser/collection/thisBook/";

const { firstName, setFirstName } = useContext(AuthContext);
const { isVerified, setIsVerified } = useContext(AuthContext);
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
const { ownsProduct, setOwnsProduct } = useContext(AuthContext);
const {userBook} = useContext(AuthContext);
const [showComponent, setShowComponent] = useState(true);
const [imgURLArray, setImgURLArray] = useState();
const [completeImgURLArray, setCompleteImgURLArray] = useState();
const [bookTextArray, setBookTextArray] = useState();
const [pageTextColorArray, setPageTextColorArray] = useState();
const [bookTitle, setBookTitle] = useState('My Book');
const imgArray = [];
const pageText = [];
const [imgListSize, setImgListSize]  = useState(0);
const [maxWidth, setMaxWidth] = useState();
const [maxHeight, setMaxHeight] = useState();
const [leftDisabled, setLeftDisabled] = useState(true);
const [rightDisabled, setRightDisabled] = useState(false);
const [currentPageImage, setCurrentPageImage]  = useState();
const [currentPageText, setCurrentPageText] = useState();
const [currentPageTextColor, setCurrentPageTextColor] = useState();
const [currentPageIndex, setCurrentPageIndex]= useState(0);
const [portrait, setPortrait] = useState(false);
const [isLoading, setIsLoading] = useState(false); // true for prod

// init json, loaded from server, then appended w/ url prefix
const [rawBookSetJSON, setRawBookSetJSON] = useState();
// final json
const [bookSetJSON, setBookSetJSON] = useState();

const [indexVal, setIndexVal] = useState(0);

const [isSpinning, setSpinning] = useState(false);
const [opacityStyle, setPlayOpacity] = useState(0.38);
  


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
              <Box className={classes.upperBezel} alignItems="center">
                <IconButton onClick={handleCancel} className={classes.iconButton}>
                  <CancelIcon />
                </IconButton>
              </Box>
            </React.Fragment>
          )}
        </div>
      )}
    </ThemeProvider>
  );
  
 } 