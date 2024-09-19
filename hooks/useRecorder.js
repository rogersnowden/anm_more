import { useState, useEffect, useContext } from "react";
import { startRecording, saveRecording } from "../handlers/recorder-controls";

const initialState = {
  recordingMinutes: 0,
  recordingSeconds: 0,
  initRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  audio: null,
};

const getMimeType = () => {
  const userAgent = navigator.userAgent;
  // comment next line for debug or not
//  return {mimeType: 'audio/wav', extension: 'wav'};
  if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) {
    return { mimeType: 'audio/wav', extension: 'wav' };
  } else {
    return { mimeType: 'audio/webm', extension: 'webm' };
  }
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
    const { mimeType } = getMimeType();
    if (recorderState.mediaStream)
      setRecorderState((prevState) => {
        return {
          ...prevState,
          mediaRecorder: new MediaRecorder(prevState.mediaStream, { mimeType }),
        };
      });
  }, [recorderState.mediaStream]);

  useEffect(() => {
    const recorder = recorderState.mediaRecorder;
    let chunks = [];

    if (recorder && recorder.state === "inactive") {
      recorder.start();

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const { mimeType, extension } = getMimeType();
        const blob = new Blob(chunks, { type: mimeType });
        chunks = [];
        const audioURL = window.URL.createObjectURL(blob);

        const returnAudio = new Audio();
        returnAudio.src = audioURL;

        console.log("current audioObjArray: " + props.audioObjArray);
        props.updateAudioObjArray(returnAudio, blob, extension);

        setRecorderState((prevState) => {
          if (prevState.mediaRecorder)
            return {
              ...initialState,
              audio: audioURL,
            };
          else return initialState;
        });

        props.saveAudioFile(blob, extension);
      };
    }
    return () => {
      if (recorder) recorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [recorderState.mediaRecorder]);

  const stopRecording = () => {
    if (recorderState.mediaRecorder) {
      recorderState.mediaRecorder.stop();
    }
  };

  return {
    recorderState,
    startRecording: () => startRecording(setRecorderState),
    stopRecording,
    cancelRecording: () => setRecorderState(initialState),
    saveRecording: () => saveRecording(recorderState.mediaRecorder),
  };
}
