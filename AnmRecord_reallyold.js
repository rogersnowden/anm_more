// comment AnmRecord.js really old
import React, { useState, useEffect, useRef } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import Slider from "react-slick";

import  { Container, ImageList }  from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Axios from "axios";
import Spinner from './Spinner_ANM';

import { useReactMediaRecorder } from "react-media-recorder";
import PlayButton from './PlayButton';
import PlayIconDisabled from './PlayButtonDisabled';
import PauseButton from './PauseButton';
import RecButton from './RecButton';
import RecButtonOff from './RecButtonOff';
import Spinner_ANM from './Spinner_ANM';
import TinyDotRed from './TinyDotRed';
import TinyDotBlue from './TinyDotBlue';

import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

console.log('theme: ' + theme);

export default function AnmRecord() {

  const useStyles = makeStyles((theme) => ({
      appBar: {
      paddingBottom: '15vw',
      marginBottom: '10vw',
    },
    upperBezel: {
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
    recordControls: {
      position: 'relative',
      left: '20%',
      verticalAlign: 'bottom',
      alignItems: 'bottom',
    },
}));

const audioRef= useRef();
const audio= new Audio();

const [thisWidth, setThisWidth]= useState(window.outerWidth);

const classes=useStyles();

const [imgURLArray, setImgURLArray] = useState();
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
const [isLoading, setIsLoading] = useState(true);
const [bookSetJSON, setBookSetJSON] = useState();
const [doHicky, setDoHicky] = useState();

const [indexVal, setIndexVal] = useState(0);

const [newSlide, setNewSlide] = useState(0);
const [recText, setRecText] = useState("Record");
const [recordState, setRecordState] = useState(true);
const [isSpinning, setSpinning] = useState(false);
const [tinyDotVisible, setTinyDotVisible] = useState(false);
const [opacityStyle, setPlayOpacity] = useState(0.38);
const [playDisabled, setPlayDisabled] = useState(true);
const [playPause, setPlayPause] = useState("Play");
const [playState, setPlayState] = useState(true);
const [audioPaused, setAudioPaused] = useState(false);
const [audioEnded, setAudioEnded] = useState(false);

const onChangeSlide = (newSlide)  => {
  setCurrentPageText(bookTextArray[newSlide]);
  setIndexVal(newSlide);
  setNewSlide(newSlide);
  console.log("new slide: " + newSlide);
  };

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    echoCancellation: true
  });

const onSwipe = (props) => {
  console.log('swiped');
};

  function cacheImages(imgURLArray) {
    if (imgURLArray){
      if (imgURLArray.length > 0) {
        const getImages = () => {
          return new Promise(resolve => {
              setTimeout(() => resolve(), 100)
            })
          }
        const requestArr = imgURLArray.map(async imgLink => {
          await getImages(imgLink);
          return Axios.get(imgLink)
                  .then(response => {
                    imgArray.push(response.data);
                    console.log('here');
                  })
                  .catch(error => console.log(error.toString()))
          });
        Promise.all(requestArr).then(() => {
          setCurrentPageImage(imgURLArray[0]);
          setCurrentPageText(bookTextArray[0]);
          setCurrentPageIndex(0);
          console.log('pg idx: ' + currentPageIndex);
          setIsLoading(false);
          console.log('resolved promise.all, isLoading: ' + isLoading);
          })
        }
      }
    };  

    useEffect(() => {
      if ((imgListSize > 0) && (currentPageIndex === 0)) {
        setRightDisabled(false);
        setLeftDisabled(true);
      } 
      if (currentPageIndex === (imgListSize -1)) {
        setRightDisabled(true);
        setLeftDisabled(false);
      }
    }, [currentPageIndex]);

    function leftClickHandler() {
      // first, did we back off the last page?
      if (currentPageIndex <= (imgListSize -1)) {
        setRightDisabled(false);
      }
      // make sure we did not hit page 0
      if (currentPageIndex > 0) {
        setCurrentPageIndex(currentPageIndex - 1);
        setLeftDisabled(false);
        } else {
          setLeftDisabled(true);
        }
        console.log("left decremented");
    };

    function rightClickHandler() {
      if (currentPageIndex < (imgListSize - 1)) {
        setCurrentPageIndex(currentPageIndex + 1);
        setLeftDisabled(false);
        if (currentPageIndex >= imgListSize) {
          setRightDisabled(true);
        }
        console.log('right incremented: ' + currentPageIndex);
      }
      console.log("right click, new idx:" + currentPageIndex);
    }

  useEffect(() => {
    window.self.addEventListener("slideTransitionStart",  ()=>{
      console.log("page trans event")})
    }, []);

  
  useEffect(() => {
    Axios.get('assets/bookSet.json')
      .then(function (response) {
        // handle success
        setBookSetJSON(response.data);
        console.log("book set json loaded");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }, []);

  useEffect(() => { // set image to current position
    if (imgURLArray) {
    console.log("set image: " + imgURLArray);
    console.log("page indx: " + currentPageIndex);
    setCurrentPageImage(imgURLArray[currentPageIndex]);
    setCurrentPageText(bookTextArray[currentPageIndex]);
    setCurrentPageTextColor(pageTextColorArray[currentPageIndex]);
    console.log("img: " + currentPageImage);
    } else {
      console.log("Img url array not yet defined");
    }
  }, [currentPageIndex]);

  useEffect(() => {
    if (imgURLArray) {
      cacheImages(imgURLArray);
      setIsLoading(false);
    }
  }, [imgURLArray]);

  useEffect(() => {
    if (bookSetJSON) { 
      let thisURLArray= [];
      let thisTextArray= [];
      let thisTextColorArray= [];
      bookSetJSON.forEach((img) => {
         //var thisURL= `"`+API_URL + '/' + img.image+`"`;
         let thisURL= 'assets/' + img.image;
         let thisText = img.text;
         let thisTextColor = img.textColor;
        thisURLArray.push(thisURL);
        thisTextArray.push(thisText);
        thisTextColorArray.push(thisTextColor);
        });
        console.log("img array b4: " + imgURLArray);
        setImgURLArray(thisURLArray);
        setBookTextArray(thisTextArray);
        setPageTextColorArray(thisTextColorArray);
        setIsLoading(false);
        console.log("img array after: " + imgURLArray);
        console.log("book text array after: " + bookTextArray);
      setImgListSize(bookSetJSON.length);
      console.log('list size: ' + imgListSize);
      } else {
        console.log("bookSetJSON does not exist");
      }
    }, [bookSetJSON]);

    useEffect(() => {
      setThisWidth(window.outerWidth)
      document.body.style.backgroundColor = "white";

    }, []);

    const NextArrow = () => {
      return (
        <div
        />
      )
    };
    
    const PrevArrow = () => {
      return (
        <div
        />
      )
    };

  const renderSlides = () => {
  if (bookSetJSON) {
    return(
      bookSetJSON.map(page => 
        <div class="slider" key={page.image}>
          <img  className={classes.image} alt="Image for a page" src={page.image} />
          <p></p><p></p>
          <div className={classes.textAloneBox} >
          <Typography className={classes.textAlone} variant="h6">{page.text}</Typography>
          </div>
        </div>
      ))
    }
  };

  useEffect(() => {
    setThisWidth(window.outerWidth)
    document.body.style.backgroundColor = "white";

  }, []);

  function turnOnRecord() {
    setSpinning(true);
    startRecording();

  };
 
  function turnOffRecord() {
    stopRecording();
    setTinyDotVisible(false);
    setPlayOpacity(1);
    setPlayDisabled(false);
    setRecText("Record");
    console.log("record OFF");
  };

  function pausePlay() {
    audioRef.current.pause();
    setAudioPaused(true);
    setPlayOpacity(1);
    setPlayPause("Play");
    console.log("play Stopped");
  };

  function forcePlayReset() {
    setPlayOpacity(1);
    setPlayDisabled(false);
//    stopTimer();
    setPlayPause("Play");
  };

  function turnOnPlay() {
    audio.src = mediaBlobUrl;
    // audio play regardless, only diff is resetting src
    audioRef.current.play();
    audioRef.current.onended = (event) => {
      forcePlayReset();
    }
  };
    
  function handleRecordClick() {
    console.log("clicked record:" + recordState);
    setRecordState(recordState => !recordState);
    recordState === true ? 
      turnOnRecord() :
      turnOffRecord();
  };

  function handlePlayClick() {
    console.log("clicked play:" + playState);
//    alert("play click, playDisabled: " + playDisabled);
    if (playPause=== "Play") {
      turnOnPlay();
    } else {
      pausePlay();
    }
  };

  return (
    <div className="App" >
       {{isLoading}===true && (
        <div>
          <Spinner />
        </div>
      )}
      <Box className={classes.upperBezel} alignItems='center'  >
        <Slider className={classes.sliderBox} 
          initialSlide={0} cssEase={'ease-out'} useTransform={true} 
          speed={100} fade={false} dots={false} infinite={false} arrows={true}
          afterChange={onChangeSlide} onSwipe={onSwipe}  >
          {renderSlides()}
        </Slider>
      </Box>
      <Grid container justify='space-around' classes={{label: 'recordControls'}}>
        <Grid >
        {recText === "Record" ?
          <RecButton onClick={handleRecordClick}/> :
          <RecButtonOff onClick={handleRecordClick}/>
          }
        </Grid>
        <audio ref={audioRef} src={mediaBlobUrl} />
        <Grid>
        {recText === 'Record' ? 
        <TinyDotBlue recText= {recText} /> :
        <TinyDotRed recText= {recText} /> }
        </Grid>
        <Grid>
          {playPause === "Play" ?
              <PlayButton disabled={playDisabled} onClick={handlePlayClick} style={{opacity: {opacityStyle}}} 
              /> :
              <PauseButton onClick={handlePlayClick} 
              /> 
          }
        </Grid>
      </Grid >
    </div>
  );
 }