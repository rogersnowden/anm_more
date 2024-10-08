// AnmRecord js
import React, { useState, useEffect, useRef, useContext } from "react";
import ProdService from "./services/prod.service";
import { AuthContext } from './AuthContext';
import { makeStyles } from '@mui/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Slider from "react-slick";

import RecorderControls from "./components/recorder-controls";
import RecordingsList from "./components/recordings-list";
import useRecorder from "./hooks/useRecorder";

import  { Container, ImageList }  from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import Spinner from './Spinner_ANM';

//import { useReactMediaRecorder } from "react-media-recorder";
import PlayButton from './PlayButton';
import PlayIconDisabled from './PlayButtonDisabled';
import PauseButton from './PauseButton';
import RecButton from './RecButton';
import RecButtonOff from './RecButtonOff';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import TinyDotRed from './TinyDotRed';
import TinyDotBlue from './TinyDotBlue';
import SaveButton from './SaveButton';
import RecView from './RecView';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import "./slick-ext.css";
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
export default function AnmRecord({userName, productSKU}) {

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
    sliderBox: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '35vw', // Same width as upperBezel to maintain consistency
      height: '52vw', // Height adjusted to maintain 4:3 aspect ratio
      borderStyle: 'solid',
      backgroundColor: 'white',
      zIndex: 2, // Ensuring it's under the upperBezel if they overlap
      [breakpoints.up('xs')]: {
        height: '52vh',
        width: '45vh',
        borderColor: 'green',
        backgroundColor: 'white',
      },
      [breakpoints.up('sm')]: {
        height: '52vh',
        width: '45vh',
        borderColor: 'blue',
        backgroundColor: 'white',
      },
      [breakpoints.up('md')]: {
        height: '52vh',
        width: '45vh',
        borderColor: 'red',
        backgroundColor: 'white',
      },
      [breakpoints.up('lg')]: {
        height: '52vh',
        width: '45vh',
        borderColor: 'yellow',
        backgroundColor: 'white',
      },
      [breakpoints.up('xl')]: {
        height: '67vh',
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
    recordControls: {
      position: 'absolute',
      bottom: '5%',
      left: '42%',
      verticalAlign: 'bottom',
      alignItems: 'bottom',
      zIndex: '5',
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

const [doHicky, setDoHicky] = useState();
const [indexVal, setIndexVal] = useState(0);

const [newSlide, setNewSlide] = useState(0);
const [recText, setRecText] = useState("Record");
const [recordState, setRecordState] = useState(false);
const [isSpinning, setSpinning] = useState(false);
const [tinyDotVisible, setTinyDotVisible] = useState(false);
const [opacityStyle, setPlayOpacity] = useState(0.38);
const [playDisabled, setPlayDisabled] = useState(true);
const [playPause, setPlayPause] = useState("Play");
const [playState, setPlayState] = useState(true);
const [audioPaused, setAudioPaused] = useState(false);
const [audioEnded, setAudioEnded] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);

const [audioObjArray, setAudioObjArray] = useState([]);
const [audioNameArray, setAudioNameArray] = useState([]);
const [currentAudio, setCurrentAudio] = useState();
const [audioBlob, setAudioBlob] = useState(null);

const audioRef= useRef();

// obtain book length from AuthContext
useEffect(() => {
  if (userBook ) {
    console.log("img list size: " + imgListSize + rightDisabled);
    setImgListSize(userBook.bookcontents.length);
  }
}, [imgListSize]);

useEffect(() => {
  console.log("loaded userbook: " + userBook, currentPageIndex);
  // load cache, get audio files as well
  preloadImagesForNextPages(userBook.bookcontents);
}, [userBook]);

useEffect(() => {
  console.log("hit the audio array");
}, [audioObjArray]); 

// cb func 
function updateAudioObjArray(thisAudio) {
  console.log("before updateAudioObjArray" + audioObjArray + " " + audioObjArray.length);
  // new audio, needs writing, set dirty bit.
  thisAudio.dirty= true;

    // Extract the blob from the audio object
    fetch(thisAudio.src)
    .then(res => res.blob())
    .then(blob => {
      setAudioBlob(blob);
    });

  //  console.log('new audio: ' + thisAudio);
//  console.log('audioObj: ' + audioObjArray);
//  console.log("currentPageIndex: " + currentPageIndex);
  setAudioObjArray( arr => {
    return arr.map((item, i) => {
      return i=== currentPageIndex ? thisAudio : item
        })
    })
  // set curr ref for playing thing just recorded
  setCurrentAudio(thisAudio);
  console.log("updateAudioObjArray" + audioObjArray + " " + audioObjArray.length);
  console.log("after updateAudioObjArray" + audioObjArray + " " + audioObjArray.length);
  
  };
  
  // grab all images, audio as well, and cache
  async function preloadImagesForNextPages(bookContents) {
    console.log("preloadImageForNextPages 2");
    const head = document.getElementsByTagName('head')[0];
    const audioSet = [];
    const audioNames = [];

    for (let i = 0; i < bookContents.length; i++) {
        const page = bookContents[i];
        let audioObject;

        console.log("page audio, page " + i + ": " + page.audio);

        if (page.audio) {
            // Check if the audio file exists
            const audioUrl = page.audio;
            try {
                const response = await fetch(audioUrl, { method: 'HEAD' }); // Wait for the fetch request to complete
                if (response.ok) {
                    // File exists
                    audioObject = new Audio(audioUrl);
                    audioObject.addEventListener('canplaythrough', () => {
                        // This event fires when the audio can be played all the way through
                        console.log("Audio file is ready to play.");
                        setPlayDisabled(false); // Enable the play button
                    });
                    audioObject.addEventListener('error', () => {
                        console.error("Error loading audio file.");
                        setPlayDisabled(true); // Disable the play button if there’s an error
                    });
                } else {
                    // File does not exist
                    audioObject = new Audio();  // Empty audio object
                    setPlayDisabled(true);
                }
            } catch (error) {
                console.error("Error checking audio file:", error);
                audioObject = new Audio();  // Empty audio object
                setPlayDisabled(true);
            }
        } else {
            audioObject = new Audio();  // No audio file specified
            setPlayDisabled(true);
        }

        audioObject.dirty = false;
        audioSet.push(audioObject);
        audioNames.push('page' + i + 'audio');
        console.log("this page, audio" + audioSet);
    }

    setAudioObjArray(audioSet);
    setAudioNameArray(audioNames);
    setCurrentAudio(audioSet[0]);

    // If the first audio file is valid and loaded, enable the play button
    if (audioSet[0] && audioSet[0].src) {
        audioSet[0].addEventListener('canplaythrough', () => {
            console.log("First audio file is ready to play.");
            setPlayDisabled(false); // Enable the play button
        });
    } else {
        setPlayDisabled(true);
    }
}
   
    // Function to handle saving the audio Blob
    // binary Blob gets passed in, or must convert HTMLAudioElement to blob first
    // depending on call point, might need to test blob first, then use or convert first
    const saveAudioFile = (blob) => {
      prodService.saveAudioFile(userName, productSKU, currentPageIndex, blob)
        .then((response) => {
          console.log("File saved successfully", response);
        })
        .catch((error) => {
          console.error("Error saving file", error);
        });
    };
  
  // Integrate useRecorder hook
//  const { recorderState, ...handlers } = useRecorder({
//    audioObjArray, 
//    updateAudioObjArray, 
//    saveAudioFile // Pass the saveAudioFile function to useRecorder
//  });
const { recorderState, startRecording, stopRecording, audioBlob: recordedAudioBlob, ...handlers } = useRecorder({
  updateAudioObjArray: (audioElement, blob) => {
    // Update your state with the new audio element and blob
    setAudioObjArray((arr) => {
      return arr.map((item, i) => (i === currentPageIndex ? audioElement : item));
    });
    setCurrentAudio(audioElement);
  },
  saveAudioFile // pass saveAudioFile func to useRecorder
});

useEffect(() => {
  if (recordedAudioBlob) {
    console.log(recordedAudioBlob);
  }
}, [recordedAudioBlob]);

const { audio } = recorderState;


const onChangeSlide = (newSlide) => {
  console.log("onChangeSlide: " + audioObjArray);

  // Check if audioObjArray is defined and the currentPageIndex is within bounds
  if (audioObjArray[currentPageIndex] && audioObjArray[currentPageIndex].dirty) {
      // save just-rec audio to server, use web worker if needed
      console.log("Audio name: " + audioNameArray[currentPageIndex]);
      console.log("Dirty audio to save now");
  } else {
      console.warn("audioObjArray or audioObjArray[currentPageIndex] is undefined.");
  }

  setCurrentPageText(userBook[newSlide]);
  setIndexVal(newSlide);
  setCurrentPageIndex(newSlide);

  // Check if the newSlide index is valid before updating the currentAudio
  if (audioObjArray[newSlide]) {
      setCurrentAudio(audioObjArray[newSlide]);
      console.log("cur src: " + audioObjArray[newSlide].src);
      if (audioObjArray[newSlide].src) {
          setPlayDisabled(false);
      } else {
          setPlayDisabled(true);
      }
  } else {
      console.warn(`No audio object found for page index ${newSlide}`);
      setPlayDisabled(true);
  }

  console.log("new slide: " + newSlide);
};

  const onSwipe = (props) => {
  console.log("onSwipe");
  console.log('swiped');
};

      useEffect(() => { // set image to current position
        console.log("FX 3 currentPageIndex: " + currentPageIndex);
        if (currentPageIndex && userBook) {
          setImgListSize(userBook.bookcontents.length);
        }
      if (completeImgURLArray) {
      console.log("page indx: " + currentPageIndex);
      console.log("curr img: " + completeImgURLArray[currentPageIndex]);
      setCurrentPageImage(completeImgURLArray[currentPageIndex]);
      setCurrentPageText(bookTextArray[currentPageIndex]);
      setCurrentPageTextColor(pageTextColorArray[currentPageIndex]);
      console.log("img: " + currentPageImage);
      } else {
        console.log("Img url array not yet defined");
      }
      if ((imgListSize > 0) && (currentPageIndex === 0)) {
        setRightDisabled(false);
        setLeftDisabled(true);
      } 
      if (currentPageIndex === (imgListSize -1)) {
        setRightDisabled(true);
        setLeftDisabled(false);
      }
      // if an audio url/obj exists, enable play
//      if ((currentPageIndex) && (audioObjArray[currentPageIndex].audio )) {
//        setPlayDisabled(false);
//      }
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
    console.log("FX 4 add window slideTransition listener");
    window.self.addEventListener("slideTransitionStart",  ()=>{
      console.log("page trans event")})
    }, []);

  //TODO Create array of cached audio obj from prev sessions

  useEffect(() => {
    console.log("FX 5 completeImgURLArray");

    if (completeImgURLArray) {
      console.log("img loaded:" + imgListSize);
//      cacheImages(completeImgURLArray);
      setIsLoading(false);
    }
  }, [completeImgURLArray]);

    useEffect(() => {
      console.log("FX 7 setThisWidth:" + playState);

      setThisWidth(window.outerWidth)
      document.body.style.backgroundColor = "white";

    }, []);

  useEffect(() => {
    console.log("FX 8 setthiswidth emtpy" + playState);

    setThisWidth(window.outerWidth)
    document.body.style.backgroundColor = "white";

  }, []);

  function turnOnRecord() {
    console.log("aud array now: " + audioObjArray);
    console.log("trn on rec: " + currentAudio);
    setSpinning(true);
    setRecText("Stop");
    setPlayDisabled(true);
    startRecording();
  };

  function turnOffRecord() {
    console.log('rec state: ' + recorderState);
    
    stopRecording();
    //const recFile = new File([audioRef.current.src], 'fredd.wav', { type: "audio/wav" });
    //let thisMediaBlobURL = audioRef.current.src;
    //bookSetJSON[currentPageIndex].audio= thisMediaBlobURL;
//    audioArray[currentPageIndex] = audioRef;
    setTinyDotVisible(false);
    setPlayOpacity(1);
    setPlayDisabled(false);
    setRecText("Record");

    console.log("record OFF");
  };

  function pausePlay() {
    console.log("pausePlay:" + playState);
    audioObjArray[currentPageIndex].current.pause();
    setAudioPaused(true);
    setPlayOpacity(1);
    setPlayPause("Play");
    console.log("play Stopped");
  };

  function forcePlayReset() {
    console.log("forcePlayReset:" + playState);
    setPlayOpacity(1);
    setPlayDisabled(false);
//    stopTimer();
    setPlayPause("Play");
  };

  useEffect(() => {
    console.log("FX 9 playDisabled:" + playState);

    if (playDisabled && currentAudio) {
      currentAudio.onended = (event) => {
        forcePlayReset();
        }
      console.log('playing changed');
    }
  }, [playDisabled]);

  function turnOnPlay() {
    console.log("turnOnPlay:" + playState);
    console.log("play:" + currentAudio);

    if (currentAudio.src) {
        currentAudio.play().then(() => {
            console.log("play time");
        }).catch(error => {
            console.error("Playback failed:", error);
            handlePlaybackError(error);
        });
    } else {
        console.log("No valid audio source, skipping play.");
    }
}   
function handlePlaybackError(error) {
  alert("An error occurred during audio playback. Please record new audio.");
  setPlayDisabled(true);
}

  function handleRecordClick() {
    console.log("handleRecordClick, playstate: " + playState + " rec state: " + recordState);
    setRecordState(prevState => {
      if (prevState) {
        turnOffRecord();
      } else {
        turnOnRecord();
      }
      return !prevState;
    });
  }
  

  function handlePlayClick() {
    console.log("handlePlayClick:" + playState);
//    alert("play click, playDisabled: " + playDisabled);
    if (playPause=== "Play") {
      turnOnPlay();
      setIsPlaying(true);
      setPlayDisabled(true);
    } else {
      pausePlay();
    }
  };

  function handleCancel() {
    setShowComponent(false);
//    console.log("record cancel");
  };

  function NextArrow(props) {
    const { className, style, onClick, isEnabled } = props;
    return (
        <div className={`${className} arrows`} style={{ ...style, display: "block", opacity: isEnabled ? 1 : 0.3 }} onClick={onClick}>
            <ArrowForwardIosIcon style={{ fontSize: '20px', color: 'black' }} />
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick, isEnabled } = props;
    return (
        <div className={`${className} arrows`} style={{ ...style, display: "block", opacity: isEnabled ? 1 : 0.3 }} onClick={onClick}>
            <ArrowBackIosIcon style={{ fontSize: '20px', color: 'black' }} />
        </div>
    );
}
      
  // TODO: load cached audio blobs/files, also save recorded files
  const renderSlides = () => {
    console.log("userBook: " + userBook);
    console.log("renderSlides");
    if (userBook) {
      return(
        userBook.bookcontents.map(page => 
          <div class="slider" key={page.image}>
            <img  className={classes.image} alt="Image for a page" src={page.image} />
          </div>
        ))
      }
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
                <ArrowBackIosIcon />
                <Slider
                  className={classes.sliderBox}
                  initialSlide={0}
                  cssEase="ease-out"
                  useTransform={true}
                  speed={100}
                  fade={false}
                  dots={false}
                  infinite={false}
                  arrows={true}
                  nextArrow={<NextArrow isEnabled={currentPageIndex < userBook.bookcontents.length - 1}/>}
                  prevArrow={<PrevArrow isEnabled={currentPageIndex > 0}/>}
//                  beforeChange={handleBeforeChange}
                  afterChange={onChangeSlide}
                  onSwipe={onSwipe}
                >
                  {renderSlides()}
                </Slider>
              </Box>
              <Grid container justify="space-around" className={classes.recordControls}>
              <Grid >
                {recText === "Record" ?
                  <RecButton onClick={handleRecordClick}/> :
                  <RecButtonOff onClick={handleRecordClick}/>
                  }
            </Grid>
        <Grid>
          &nbsp;
        {
            recText === 'Record' ? 
        <TinyDotBlue  /> :
        <TinyDotRed  /> 
        }
          &nbsp;
        </Grid>
        <Grid>
          {playPause === "Play" ?
              <PlayButton disabled={playDisabled} onClick={handlePlayClick} style={{opacity: {opacityStyle}}} 
              /> :
              <PauseButton onClick={handlePlayClick} 
              /> 
          }
        </Grid>
              </Grid>
            </React.Fragment>
          )}
        </div>
      )}
    </ThemeProvider>
  );
  
 } 