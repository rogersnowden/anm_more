// AnmRecord
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
import Axios from "axios";
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

export default function AnmRecord({ userName, productSKU }) {
  console.log("AnmRecord start")

  const API_URL = "https://localhost:4000/api/";
  const THIS_BOOK_URL = API_URL + 'users/' + userName + '/mybooks/'  
  + productSKU + '/';

  console.log("UserName:", userName, "ProductSKU:", productSKU);

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
      border: 'solid 3px #0ff',
      position: 'absolute',
      zIndex: 3,
      paddingTop: '0vh',
      top: '60% !important',
      left: '50%',
      topMargin: '10vh',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '60vw',
      height: '80vw',
      maxHeight: '95%',
      backgroundColor: 'white !important',
      color: 'white !important',
      [breakpoints.up('xs')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'green',
        backgroundColor: 'white',
      },
      [breakpoints.up('sm')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'blue',
        backgroundColor: 'white',
      },
      [breakpoints.up('md')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'red',
        backgroundColor: 'white',
      },
      [breakpoints.up('lg')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'yellow',
        backgroundColor: 'white',
      },
      [breakpoints.up('xl')]: {
        top: '60% !important',
        height: '52vh',
        width: '45vh',
        borderColor: 'orange',
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
          height: '10.0vh',
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
      position: 'absolute',
      bottom: '8%',
      left: '40%',
      verticalAlign: 'bottom',
      alignItems: 'bottom',
    },
}));

// grab URI, remove trailing '/' if needed
const BaseURI = document.baseURI;
if (! BaseURI.endsWith('/'))
  {
    BaseURI = BaseURI.concat('/');
  }


const [thisWidth, setThisWidth]= useState(window.outerWidth);

const classes=useStyles();

const instance = Axios.create({
  baseURL: window.location.href,
  timeout: 10000,
  headers: {'Access-Control-Allow-Origin': '*'},
});

//const { userName, setUserName } = useContext(AuthContext);
const { firstName, setFirstName } = useContext(AuthContext);
const { isVerified, setIsVerified } = useContext(AuthContext);
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
const { ownsProduct, setOwnsProduct } = useContext(AuthContext);
//const { productSKU, setProductSKU } = useContext(AuthContext);
//const { productResponse, setProductResponse } = useContext(AuthContext);


const [showComponent, setShowComponent] = useState(true);
const [bookSize, setBookSize] = useState(0);
const [imgURLArray, setImgURLArray] = useState();
const [completeMediaURLArray, setCompleteMediaURLArray] = useState([]);
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
const [currentPageIndex, setCurrentPageIndex]= useState();
const [portrait, setPortrait] = useState(false);
const [isLoading, setIsLoading] = useState(false); // true for prod
const [message, setMessage] = useState('');
const [messageDialogOpen, setMessageDialogOpen] = useState(false);

// init json, loaded from server, then appended w/ url prefix
const [rawBookSetJSON, setRawBookSetJSON] = useState();
// final json
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
const [isPlaying, setIsPlaying] = useState(false);

const [userBook, setUserBook] = useState();

const [audioObjArray, setAudioObjArray] = useState([]);
const [currentAudio, setCurrentAudio] = useState();
//const audioObjArray = [];
// working var to load pre-recorded audio url, to convert to Audio()
const audioURLArray = [];

const audioRef= useRef();
// test axios
const j = Axios;

// from params passed, get this book (productSKU)
useEffect(() => {
  console.log("FX 1 userName, productSKU");
  console.log("userName, productSKU: ", userName + " " + productSKU);
  ProdService.getUserBook(userName, productSKU)
  .then(data => {
    console.log("get user book successful", data);
    cacheUserBookContents(data);
    setUserBook(data);
  })
  .catch(error => {
//    setUserBook({});
    console.error("Error fetching book:", error);
  });
  }, []); // Added isLoggedIn as well to re-run when it changes

  useEffect(() => {
console.log(" set userBook");
  }, [userBook] );

// cb func 
function updateAudioObjArray(thisAudio) {
  console.log("updateAudioObjArray");
  console.log('new audio: ' + thisAudio);
  console.log('audioObj: ' + audioObjArray);
  console.log("currentPageIndex: " + currentPageIndex);
  setAudioObjArray( arr => {
    return arr.map((item, i) => {
      return i=== currentPageIndex ? thisAudio : item
        })
    })
  // set curr ref for playing thing just recorded
  setCurrentAudio(thisAudio);
  pushAudio();
  //let newAudioObjArray = audioObjArray;
  //newAudioObjArray[currentPageIndex] = thisAudio;
  //setAudioObjArray(newAudioObjArray);
  //audioObjArray[currentPageIndex] = thisAudio;
  
  //setAudioObjArray();
  console.log('updated array: ' + audioObjArray);
  
  };
  
const { recorderState, ...handlers } = useRecorder({updateAudioObjArray});

const { audio } = recorderState;

const onChangeSlide = (newSlide)  => {
  console.log("onChangeSlide: new is: " + newSlide);
  if (newSlide < 0) {
    newSlide = 0;
  }
if (userBook) {
    setCurrentPageText(userBook[newSlide]);
    setIndexVal(newSlide);
    setCurrentPageIndex(newSlide);
    // set current play Audio
//    if (audioObjArray[newSlide].src) {
//      setPlayDisabled(false);
//    }
//    setCurrentAudio(audioObjArray[newSlide]);
    console.log("new slide: " + newSlide);
    }
  };

const onSwipe = (props) => {
  console.log("onSwipe");
};

//  function cacheImages(completeMediaURLArray) {
//    console.log("cacheImages");
//    if (completeMediaURLArray){
//      console.log("img url arr 0: " + completeMediaURLArray[0]);
//      console.log("img url arr 1: " + completeMediaURLArray[1]);
//      if (completeMediaURLArray.length > 0) {
//        const getImages = () => {
//          return new Promise(resolve => {
//              setTimeout(() => resolve(), 100)
//           })
//          }
//        const requestArr = completeMediaURLArray.map(async imgLink => {
//          await getImages(imgLink);
//          console.log('base: ' + BaseURI);
//          console.log("img link: " + imgLink);
//          return Axios.get(imgLink)
//                  .then(response => {
//                    imgArray.push(response.data);
//                    console.log('response here: ' + response.data);
//                  })
//                  .catch(error => {
//                    console.log("img fetch err" + error.toString())}
//                    );
//          });
//          console.log("Req arr: " + requestArr[0] + requestArr[1]);
//        Promise.all(requestArr).then(() => {
//          setCurrentPageImage(completeMediaURLArray[0]);
//          setCurrentPageText(bookTextArray[0]);
//          console.log("text arr: " + bookTextArray);
//          setCurrentPageIndex(0);
//          console.log('pg idx: ' + currentPageIndex);
//          setIsLoading(false);
//          console.log('resolved promise.all, isLoading: ' + isLoading);
//          })
//        }
//      }
//    };  

      useEffect(() => { // set image to current position
      console.log("FX currentPageIndex");
//      if (completeMediaURLArray) {
      if (userBook) {
          console.log("page indx: " + currentPageIndex);
      console.log("curr img: " + userBook.bookcontents[currentPageIndex].image);
      setCurrentPageImage(userBook.bookcontents[currentPageIndex].image);
//      setCurrentPageText(bookTextArray[currentPageIndex]);
//      setCurrentPageTextColor(pageTextColorArray[currentPageIndex]);
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
    }, [userBook, currentPageIndex]);

    function leftClickHandler() {
      console.log("leftClickHandler");

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
      console.log("rightClickHandler");

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
    console.log("FX  one time addEvenListener");

    window.self.addEventListener("slideTransitionStart",  ()=>{
      console.log("page trans event")})
    }, []);

  // post audio to server
    function pushAudio () {
      console.log("pushAudio");
      var form = new FormData();
      let blob = new Blob([currentAudio], {type: "audio/wav"});
      let aFile = new File([blob], 'recording.wav');
      const data = {
        "user" : "test",
      };
      form.append("files.file", aFile);
      form.append('data', JSON.stringify(data));
      instance.post(instance.baseURL + '/file_upload.pl', 
        {form}, 
        {headers : {
          'Access-Control-Allow-Origin': '*'
        }}
      )
      .then(function (response) {
        // handle success
        console.log('did post');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    };
 
//  useEffect(() => {
//    console.log("FX completeMediaURLArray");

//    if (completeMediaURLArray) {
////      cacheImages(completeMediaURLArray);
//      setIsLoading(false);
//    }
//  }, [completeMediaURLArray]);

//  useEffect(() => {
//    if (audioURLArray) {
//      cacheAudio();
//      setIsLoading(false);
//    }
//  }, [audioURLArray]);

  // read json, iterate through and set up page contents
  function cacheUserBookContents(userBook) {
    console.log("cacheUserBookContents");
    if (userBook.bookcontents.length > 0) { 
      console.log("book url: " + THIS_BOOK_URL);
      // loop each json array element, set up img,txt,audio
      for (let i=0; i< userBook.bookcontents.length; i++) {
        let thisImage = userBook.bookcontents[i].image;
        let thisAudio = userBook.bookcontents[i].audio;
        userBook.bookcontents[i].image = THIS_BOOK_URL + thisImage;
        userBook.bookcontents[i].audio = THIS_BOOK_URL + thisAudio;
        console.log("upd book img: " + userBook.bookcontents[i].image);
        console.log("upd book aud: " + userBook.bookcontents[i].audio);
      } // loop complete
        setIsLoading(false);
      setBookSize(userBook.bookcontents.length);
      console.log('list size: ' + bookSize);
      // finally, init current page to 0 (cover page)
      setCurrentPageIndex(0);
      } else {
        console.log("userBook.bookcontents does not exist");
      }
    }

  function preloadImagesForNextPages(currentPageIndex, bookContents) {
    console.log("preloadImageForNextPages 2");
    const head = document.getElementsByTagName('head')[0];
    // Remove existing preload links to avoid clutter and unnecessary preloading
    const existingPreloads = document.querySelectorAll('link[rel="preload"]');
    existingPreloads.forEach(link => head.removeChild(link));
    // Determine the range of pages to preload; adjust according to your needs
    const startPage = currentPageIndex + 1;
    const endPage = Math.min(startPage + 2, userBook.bookcontents.length); // Preload next 2 pages, adjust as needed
    for (let i = startPage; i < endPage; i++) {
      const page = bookContents[i];
      if (page && page.image) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = API_URL + `users/${userName}/mybooks/${userBook.sku}/` + page.image;
        console.log("preload link: " + preloadLink.href);
        head.appendChild(preloadLink);
      }
      console.log("head: " + head);
    }
  }
    
  useEffect(() => {
    console.log("FX  currentPageIndex, userBook");
    if (userBook && userBook.bookcontents) {
      preloadImagesForNextPages(currentPageIndex, userBook);
    }
  }, [currentPageIndex, userBook]);

    useEffect(() => {
      console.log("FX  nada setThisWidth(window.outerWidth) 1 ");
      setThisWidth(window.outerWidth)
      document.body.style.backgroundColor = "white";
    }, []);

    const NextArrow = () => {
      console.log("NextArrow");
      return (
        <div
        />
      )
    };
    
    const PrevArrow = () => {
      console.log("PrevArrow");
      return (
        <div
        />
      )
    };

  useEffect(() => {
    console.log("FX  nada setThisWidth(window.outerWidth) 2");
    setThisWidth(window.outerWidth)
    document.body.style.backgroundColor = "white";
  }, []);

  function turnOnRecord() {
    setSpinning(true);
    setRecText("Stop");
    setPlayDisabled(true);
    handlers.startRecording();
  };

  function turnOffRecord() {
    console.log("turnOffRecord");
    console.log('rec state: ' + recorderState);
    handlers.saveRecording();
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
    console.log("pausePlay");
    audioObjArray[currentPageIndex].current.pause();
    setAudioPaused(true);
    setPlayOpacity(1);
    setPlayPause("Play");
    console.log("play Stopped");
  };

  function forcePlayReset() {
    console.log("forcePlayReset");
    setPlayOpacity(1);
    setPlayDisabled(false);
//    stopTimer();
    setPlayPause("Play");
  };

  useEffect(() => {
    console.log("FX   playDisabled");
    if (playDisabled && currentAudio) {
      currentAudio.onended = (event) => {
        forcePlayReset();
        }
      console.log('playing changed');
    }
  }, [playDisabled]);

  function turnOnPlay() {
    console.log("turnOnPlay");
    currentAudio.play();
    console.log("play time");
  };
    
  function handleRecordClick() {
    console.log("handleRecordClick");
    console.log("clicked record:" + recordState);
    setRecordState(recordState => !recordState);
    recordState === true ? 
      turnOnRecord() :
      turnOffRecord();
  };

  function handlePlayClick() {
    console.log("handlePlayClick");
    console.log("clicked play:" + playState);
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
    console.log("handleCancel");
    setShowComponent(false);
  };

  // TODO: load cached audio blobs/files, also save recorded files
  const renderSlides = () => {
    console.log("renderSlides");
//    if (bookSetJSON) {
    if (userBook) {
        return(
        userBook.bookcontents.map(pageURL => 
          <div class="slider" key={pageURL}>
            <img  className={classes.image} alt="Image for a page" src={pageURL.image} />
            <p></p><p></p>
            <div className={classes.textAloneBox} >
            <Typography className={classes.textAlone} variant="subtitle2">{pageURL.text}</Typography>
            </div>
          </div>
        )
        )
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
                  afterChange={onChangeSlide}
                  onSwipe={onSwipe}
                >
                  {renderSlides()}
                </Slider>
              </Box>
              <Grid container justify="space-around" className={classes.recordControls}>
                <Grid>
                  {/* Your existing code */}
                </Grid>
                <Grid>
                  {/* Your existing code */}
                </Grid>
                <Grid>
                  {/* Your existing code */}
                </Grid>
              </Grid>
            </React.Fragment>
          )}
        </div>
      )}
    </ThemeProvider>
  );
 }