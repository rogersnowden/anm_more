// AnmMictest.jst
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Box, Slider, Typography, Button } from '@mui/material';
import { AuthContext } from './AuthContext';

export default function AnmMicTest() {
  const { micLevel, setMicLevel } = useContext(AuthContext); // Use micLevel from context
  const [isRecording, setIsRecording] = useState(false);
  const [isTestingMic, setIsTestingMic] = useState(false); // State for mic test
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio blob
  const [audioLevel, setAudioLevel] = useState(0); // Decibel meter level
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const gainNodeRef = useRef(null);
  const dataArrayRef = useRef(null);
  const mediaRecorderRef = useRef(null); // For recording
  const audioRef = useRef(null); // For playback
  const recordedChunks = useRef([]); // Store the audio chunks
  const outputStreamRef = useRef(null); // To store the processed audio stream

  // Initialize the audio context and analyser
  const setupAudio = async () => {
    try {
      // Get microphone input
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create media source, analyser, and gain nodes
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = micLevel / 100 * 5; // Adjust gain range to go up to 5x
      gainNodeRef.current = gainNode;

      // Create a destination for processed audio and connect nodes
      const destination = audioContext.createMediaStreamDestination();
      source.connect(gainNode); // Mic source goes into gain
      gainNode.connect(analyser); // Gain goes into analyser for decibel meter
      gainNode.connect(destination); // Gain connects to destination for processed audio

      // Create a new MediaStream from the destination
      outputStreamRef.current = destination.stream;

      // Initialize MediaRecorder to capture the processed audio
      mediaRecorderRef.current = new MediaRecorder(outputStreamRef.current);

      // When data becomes available, store it
      mediaRecorderRef.current.ondataavailable = (e) => {
        recordedChunks.current.push(e.data);
      };

      // When recording stops, create a Blob from the chunks
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(recordedChunks.current, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
        recordedChunks.current = []; // Clear chunks after recording
      };

      // Initialize the data array for decibel meter updates
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Start updating the decibel meter
      updateAudioLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  // Function to start recording audio
  const startRecording = () => {
    recordedChunks.current = []; // Clear previous chunks
    mediaRecorderRef.current.start(); // Start recording
    setIsRecording(true);
  };

  // Function to stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop(); // Stop recording
    setIsRecording(false);
  };

  // Function to start the mic test
  const startMicTest = () => {
    setIsTestingMic(true);
    updateAudioLevel(); // Start decibel meter updates for testing
  };

  // Function to stop the mic test
  const stopMicTest = () => {
    setIsTestingMic(false);
  };

  // Function to update the decibel meter with better scaling and color transition
  const updateAudioLevel = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);

      // Calculate average decibel level
      const avg = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
      
      // Scale the average to a more sensitive range and cap at 100
      const scaledLevel = Math.min(100, (Math.log(avg + 1) / Math.log(256)) * 100); 
      
      setAudioLevel(scaledLevel);
    }

    if (isTestingMic || isRecording) {
      requestAnimationFrame(updateAudioLevel); // Continue updating while testing or recording
    }
  };

  // Handle slider change for mic volume
  const handleVolumeChange = (event, newValue) => {
    setMicLevel(newValue);
    if (gainNodeRef.current) {
      // Adjust the gain value to range from 0 to 5
      gainNodeRef.current.gain.value = newValue / 100 * 5;
    }
  };

  // Play back the recorded audio
  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  // Function to dynamically determine color based on audio level
  const getColorForLevel = (level) => {
    if (level > 80) {
      return 'red'; // High levels
    } else if (level > 50) {
      return 'orange'; // Mid-high levels
    } else if (level > 30) {
      return 'yellow'; // Mid-low levels
    } else {
      return 'green'; // Low levels
    }
  };

  useEffect(() => {
    setupAudio(); // Setup the audio context and analyser when component mounts
  }, []);

  return (
    <Box>
      <Typography variant="h4">Mic Test</Typography>
      <Box
        sx={{
          border: '2px solid black',
          padding: '10px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="body1">
            Press "Start Mic Test" and adjust your system microphone volume while speaking.
          </Typography>
          <Typography variant="body2" style={{ fontStyle: 'italic' }}>
            "The quick brown fox jumps over the lazy dog."
          </Typography>
        </Box>
        <Button
          variant={isTestingMic ? 'contained' : 'outlined'}
          color="primary"
          onClick={isTestingMic ? stopMicTest : startMicTest}
        >
          {isTestingMic ? 'Stop Mic Test' : 'Start Mic Test'}
        </Button>
      </Box>

      {/* Decibel Meter for Mic Test */}
      {isTestingMic && (
        <Box style={{ marginTop: '20px', height: '30px', width: '300px', backgroundColor: '#ccc', position: 'relative' }}>
          <Box
            style={{
              height: '100%',
              width: `${audioLevel}%`,
              backgroundColor: getColorForLevel(audioLevel), // Dynamic color based on level
              transition: 'width 0.1s ease',
            }}
          />
        </Box>
      )}

      <Typography variant="h5" style={{ marginTop: '40px' }}>
        Fine-Tune Your Microphone Level
      </Typography>
      <Box>
        <Typography variant="body1">
          Please read the following sentence out loud to fine-tune your recording level:
        </Typography>
        <Typography variant="body2" style={{ fontStyle: 'italic' }}>
          "The quick brown fox jumps over the lazy dog."
        </Typography>
      </Box>

      {/* Record/Stop Buttons */}
      <Box>
        {isRecording ? (
          <Button variant="contained" color="secondary" onClick={stopRecording}>
            Stop Recording
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={startRecording}>
            Start Recording
          </Button>
        )}
      </Box>

      {/* Decibel Meter */}
      <Box style={{ marginTop: '20px', height: '20px', backgroundColor: '#ccc', position: 'relative' }}>
        <Box
          style={{
            height: '100%',
            width: `${audioLevel}%`,
            backgroundColor: getColorForLevel(audioLevel), // Dynamic color based on level
            transition: 'width 0.1s ease',
          }}
        />
      </Box>

      {/* Volume Slider */}
      <Box style={{ marginTop: '20px' }}>
        <Typography variant="body1">Adjust Recording Volume:</Typography>
        <Slider
          value={micLevel} // Use micLevel from context
          min={0}
          max={100}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
        />
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Current Volume: {micLevel}
        </Typography>
      </Box>

      {/* Playback Button */}
      <Box style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={playRecording}
          disabled={!audioBlob} // Disable the button if no audio has been recorded
        >
          Play Recorded Audio
        </Button>
        <audio ref={audioRef} controls style={{ display: 'none' }} />
      </Box>
    </Box>
  );
}
