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

export default function AnmRecord({userName, productSKU}) {

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

const UserBase = "cust/users/thisUser/collection/thisBook/";

//const { userName, setUserName } = useContext(AuthContext);
const [userBook, setUserBook] = useState();
const [bookSize, setBookSize] = useState(0);

const { firstName, setFirstName } = useContext(AuthContext);
const { isVerified, setIsVerified } = useContext(AuthContext);
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
const { ownsProduct, setOwnsProduct } = useContext(AuthContext);
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
const [currentPageIndex, setCurrentPageIndex]= useState();
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

const [audioObjArray, setAudioObjArray] = useState([]);
const [currentAudio, setCurrentAudio] = useState();
//const audioObjArray = [];
// working var to load pre-recorded audio url, to convert to Audio()
const audioURLArray = [];

const audioRef= useRef();
// test axios
const j = Axios;
// cb func 
function updateAudioObjArray(thisAudio) {
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

// from params passed, get this book (productSKU)
useEffect(() => {
  if (userName) {
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
  }
  }, [userName, productSKU]); // Added isLoggedIn as well to re-run when it changes

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

    function preloadImagesForNextPages(currentPageIndex, userBook) {
      console.log("preloadImageForNextPages 2");
      const head = document.getElementsByTagName('head')[0];
      // Remove existing preload links to avoid clutter and unnecessary preloading
      const existingPreloads = document.querySelectorAll('link[rel="preload"]');
      existingPreloads.forEach(link => head.removeChild(link));
      // Determine the range of pages to preload; adjust according to your needs
      const startPage = currentPageIndex;
      const endPage = Math.min(startPage + 1, userBook.bookcontents.length); // Preload next 2 pages, adjust as needed
      for (let i = startPage; i < endPage; i++) {
        const page = userBook.bookcontents[i];
        if (page && page.image) {
          const preloadLink = document.createElement('link');
          preloadLink.rel = 'preload';
          preloadLink.as = 'image';
//          preloadLink.href = API_URL + `users/${userName}/mybooks/${userBook.sku}/` + page.image;
          preloadLink.href = page.image;
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
  
const onChangeSlide = (newSlide)  => {
  setCurrentPageText(bookTextArray[newSlide]);
  setIndexVal(newSlide);
  setCurrentPageIndex(newSlide);
  // set current play Audio
  if (audioObjArray[newSlide].src) {
    setPlayDisabled(false);
  }
  setCurrentAudio(audioObjArray[newSlide]);
  console.log("new slide: " + newSlide);
  };

const onSwipe = (props) => {
  console.log('swiped');
};

  function cacheImages(completeImgURLArray) {
    if (completeImgURLArray){
      console.log("img url arr 0: " + completeImgURLArray[0]);
      console.log("img url arr 1: " + completeImgURLArray[1]);
      if (completeImgURLArray.length > 0) {
        const getImages = () => {
          return new Promise(resolve => {
              setTimeout(() => resolve(), 100)
            })
          }
        const requestArr = completeImgURLArray.map(async imgLink => {
          await getImages(imgLink);
          console.log('base: ' + BaseURI);
          console.log("img link: " + imgLink);
          return Axios.get(imgLink)
                  .then(response => {
                    imgArray.push(response.data);
                    console.log('response here: ' + response.data);
                  })
                  .catch(error => {
                    console.log("img fetch err" + error.toString())}
                    );
          });
          console.log("Req arr: " + requestArr[0] + requestArr[1]);
        Promise.all(requestArr).then(() => {
          setCurrentPageImage(completeImgURLArray[0]);
          console.log('after prom img url 0: ' + completeImgURLArray[0]);
          console.log('after prom img url 1: ' + completeImgURLArray[1]);
          setCurrentPageText(bookTextArray[0]);
          console.log("text arr: " + bookTextArray);
          setCurrentPageIndex(0);
          console.log('pg idx: ' + currentPageIndex);
          setIsLoading(false);
          console.log('resolved promise.all, isLoading: ' + isLoading);
          })
        }
      }
    };  

    function cacheAudio() {
      if (audioURLArray) {
        if (audioURLArray.length > 0) {
          // init the target finished array
          let thisObjArray= [];
          const getAudio = () => {
            return new Promise(resolve => {
                setTimeout(() => resolve(), 100)
              })
            }
          const requestArr = audioURLArray.map(async audioLink => {
            await getAudio(audioLink);
            return Axios.get(audioLink)
                    .then(response => {
                      let thisAudio = new Audio();
//                      thisAudio.src= response.data;
                      thisAudio.src = audioLink;
                      thisObjArray.push(thisAudio);
                      setAudioObjArray( arr => [...arr, thisAudio]);
//                      audioObjArray.push(thisAudio);
                      console.log('here');
                    })
                    .catch(error => console.log(error.toString()))
            });
          Promise.all(requestArr).then(() => {
            setCurrentPageIndex(0);
            // set curr playable audio to first in array
            // test first audio obj, set play button accordingly
            // NB using thisObjArray as state obj still in queue
            if (thisObjArray[0].src) {
              setCurrentAudio(thisObjArray[0]);
              setPlayDisabled(false);
            }
            console.log(' done w/ obj array');

            setIsLoading(false);
            console.log('resolved promise.all, isLoading: ' + isLoading);
            })
          }
        }
      };  

      useEffect(() => { // set image to current position
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
      if ((currentPageIndex) && (audioObjArray[currentPageIndex].audio )) {
        setPlayDisabled(false);
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

  // load json file for book
  useEffect(() => {
    console.log("Retrieving bookSet.json");
  
    // Using fetch to get the bookSet.json from the public directory
    fetch('/bookSet.json')
      .then(response => {
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON data from the response
      })
      .then(data => {
        console.log('Response data:', data);
        setBookSetJSON(data); // Set state with the fetched data
      })
      .catch(error => {
        // Handle any errors
        console.error('There was a problem with fetching bookSet.json:', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount
  
  //      headers: {
//          "Content-Type": "application/json",
//          "Access-Control-Allow-Origin": "*",
//          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"

    
  // post audio to server
    function pushAudio () {
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

  
  //TODO Create array of cached audio obj from prev sessions

  useEffect(() => {
    if (completeImgURLArray) {
      cacheImages(completeImgURLArray);
      setIsLoading(false);
    }
  }, [completeImgURLArray]);

//  useEffect(() => {
//    if (audioURLArray) {
//      cacheAudio();
//      setIsLoading(false);
//    }
//  }, [audioURLArray]);

  // read json, iterate through and set up page contents
  useEffect(() => {
    if (bookSetJSON) { 
      let thisImgURLArray= [];
      let thisTextArray= [];
      let thisTextColorArray= [];
      // loop each json array element, set up img,txt,audio
      for (let i=0; i< bookSetJSON.length; i++) {
//      bookSetJSON.forEach((img) => {
         //var thisURL= `"`+API_URL + '/' + img.image+`"`;
         let thisImgURL= BaseURI + 'src/' + userName + "/" + bookSetJSON[i].image;
         console.log('new img url: ' + thisImgURL);
         let thisText = bookSetJSON[i].text;
         let thisTextColor = bookSetJSON[i].textColor;
        thisImgURLArray.push(thisImgURL);
        thisTextArray.push(thisText);
        thisTextColorArray.push(thisTextColor);
        // push audio url to predeclared array
        audioURLArray.push(bookSetJSON[i].audio);
        console.log('json stuff loaded');
      } // loop complete
        setCompleteImgURLArray(thisImgURLArray);
        setBookTextArray(thisTextArray);
        setPageTextColorArray(thisTextColorArray);
        // cache audio: turn urls into playable objects
//        cacheAudio();
        setIsLoading(false);
        console.log("img array after: " + completeImgURLArray);
        console.log("book text array after: " + bookTextArray);
        console.log('audio url array: ' + audioURLArray);
      
      setImgListSize(bookSetJSON.length);
      console.log('list size: ' + imgListSize);
      // finally, init current page to 0 (cover page)
      setCurrentPageIndex(0);
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

  useEffect(() => {
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
    audioObjArray[currentPageIndex].current.pause();
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

  useEffect(() => {
    if (playDisabled && currentAudio) {
      currentAudio.onended = (event) => {
        forcePlayReset();
        }
      console.log('playing changed');
    }
  }, [playDisabled]);

  function turnOnPlay() {
    currentAudio.play();
    console.log("play time");
   // audioArray[currentPageIndex].current.play();

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

  // TODO: load cached audio blobs/files, also save recorded files
  const renderSlides = () => {
    console.log("book set json: " + bookSetJSON);
    console.log("userBook: " + userBook);
    if (userBook) {
      return(
        userBook.bookcontents.map(page => 
          <div class="slider" key={page.image}>
            <img  className={classes.image} alt="Image for a page" src={page.image} />
            <p></p><p></p>
            <div className={classes.textAloneBox} >
            <Typography className={classes.textAlone} variant="subtitle2">{page.text}</Typography>
            </div>
          </div>
        ))
      }
    };

//const renderSlides = () => {
//      console.log("book set json: " + bookSetJSON);
//      console.log("userBook: " + userBook);
//      if (bookSetJSON) {
//        return(
//          bookSetJSON.map(page => 
//            <div class="slider" key={page.image}>
//              <img  className={classes.image} alt="Image for a page" src={page.image} />
//              <p></p><p></p>
//              <div className={classes.textAloneBox} >
//              <Typography className={classes.textAlone} variant="subtitle2">{page.text}</Typography>
//              </div>
//            </div>
//          ))
//        }
//      };
  
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