import React  from "react";

import { useReactMediaRecorder } from "react-media-recorder";

export default function RecView (props)  {

//const thisRef = useRef();
const thisRef = new Audio();

    console.log("start");
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    video: false,
    echoCancellation: true,
    blobPropertyBag: {
        type: "audio/mpeg"
    }
  });


    
  console.log('start2');

  function startRecord() {
      startRecording();
  }

  function stopRecord() {
    stopRecording();
    console.log('ss');
}

  function turnOnPlay() {
    //audio.src = mediaBlobUrl;
//    console.log('play' + audioRef);
    thisRef.current.play();

  };

return (
    <div>
      <p>{mediaBlobUrl}</p>
      <button onClick={startRecord}>Start Recording</button>
      <button onClick={stopRecord}>Stop Recording</button>  
      <button onClick={turnOnPlay}>Play</button>  
      <audio src={mediaBlobUrl} ref={thisRef} />
    </div>
  );
};