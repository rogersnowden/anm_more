// useRecorder.js hook

import { useState, useEffect } from "react";
import { startRecording, saveRecording } from "../handlers/recorder-controls";
import Axios from "axios";


const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

export default function useRecorder(props) {
  const [recorderState, setRecorderState] = useState(initialState);

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recorderState.initRecording)
      recordingInterval = setInterval(() => {
        setRecorderState((prevState) => {
          if (
            prevState.recordingMinutes === MAX_RECORDER_TIME &&
            prevState.recordingSeconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (prevState.recordingSeconds >= 0 && prevState.recordingSeconds < 59)
            return {
              ...prevState,
              recordingSeconds: prevState.recordingSeconds + 1,
            };

          if (prevState.recordingSeconds === 59)
            return {
              ...prevState,
              recordingMinutes: prevState.recordingMinutes + 1,
              recordingSeconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream),
        };
      });
  }, [recorderState.mediaStream]);

  const postAudio = (returnAudio) => {
    let src = returnAudio.src;
    console.log('post it: ' + src);
    let fData = new FormData();
    fData.append("file", src);
    return Axios 
      .post("http://localhost:80/upload_audio.php", fData, {
        headers: {
      "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log('res: ' + res);
      return res;
    });
  };

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
 
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        var thisAudio = window.URL.createObjectURL(blob);
        
        var returnAudio= new Audio();
        returnAudio.src = thisAudio;
//        let j = postAudio(returnAudio);
console.log("curre audioObjArray: " + props.audioObjArray);
        props.updateAudioObjArray(returnAudio);

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: window.URL.createObjectURL(blob),
            };
          else return initialState;
        });
      };
    }
    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
