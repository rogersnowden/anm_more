import React, { useState, useRef, useContext, useEffect } from 'react';
import { Box, Slider, Typography, Button } from '@mui/material';
import { AuthContext } from './AuthContext';

export default function AnmLevel() {
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
  const micStreamRef = useRef(null); // Store the microphone stream for the test
  const audioRef = useRef(null); // For playback
  const recordedChunks = useRef([]); // Store the audio chunks
  const outputStreamRef = useRef(null); // To store the processed audio stream

  const frameHistory = useRef([]); // Keep track of the last few frames
  const historySize = 20; // Adjust the size of the moving average window
 
// Predefine the colors for each box using a static gradient (green -> yellow -> red)
const segmentColors = [
  'rgb(0, 255, 0)',       // Green (box 1)
  'rgb(128, 255, 0)',     // Light green (box 2)
  'rgb(192, 255, 0)',     // Yellow-green (box 3)
  'rgb(255, 255, 0)',     // Yellow (box 4)
  'rgb(255, 192, 0)',     // Orange-yellow (box 5)
  'rgb(255, 128, 0)',     // Light orange (box 6)
  'rgb(255, 64, 0)',      // Orange-red (box 7)
  'rgb(255, 32, 0)',      // Darker orange-red (box 8)
  'rgb(255, 0, 0)'        // Red (box 9)
];

  // Function to initialize the audio context and analyser for the mic test
  const setupMicTest = async () => {
    try {
      // Get microphone input
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream; // Save the mic stream for the test
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create media source, analyser, and gain nodes
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser); // Connect directly to analyser for the mic test (no gain node here)

      // Initialize the data array for decibel meter updates
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Start updating the decibel meter
      updateAudioLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  // Function to start the mic test
  const startMicTest = () => {
    setIsTestingMic(true);
    setupMicTest(); // Initialize the mic test setup
  };

  // Function to stop the mic test
  const stopMicTest = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop()); // Stop mic stream
    }
    setIsTestingMic(false);
  };

  // Adjust decibel calculation to increase scaling sensitivity and mapping
  const updateAudioLevel = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
  
      // Find the maximum decibel level for the current frame
      const currentMaxLevel = Math.max(...dataArrayRef.current);
  
      // Add the current max level to the frame history
      frameHistory.current.push(currentMaxLevel);
  
      // Limit the history size to the last 'historySize' frames
      if (frameHistory.current.length > historySize) {
        frameHistory.current.shift(); // Remove the oldest frame
      }
  
      // Calculate the average over the stored frames (moving average)
      const movingAverageLevel = frameHistory.current.reduce((sum, value) => sum + value, 0) / frameHistory.current.length;
  
      // Scale the moving average to a 0-100 range
      const scaledLevel = Math.min(100, (movingAverageLevel / 255) * 100);
  
      setAudioLevel(scaledLevel);
    }
  
    if (isTestingMic || isRecording) {
      requestAnimationFrame(updateAudioLevel); // Continue updating while testing or recording
    }
  };    
  // Handle slider change for mic volume (only affects fine-tuning section)
  const handleVolumeChange = (event, newValue) => {
    setMicLevel(newValue);
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newValue / 100 * 5; // Adjust gain value in fine-tuning section
    }
  };

  // Function to start recording
  const startRecording = async () => {
    recordedChunks.current = []; // Clear previous chunks
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      const gainNode = audioContext.createGain();
      gainNode.gain.value = micLevel / 100 * 5; // Set gain based on app-level slider

      gainNodeRef.current = gainNode;
      source.connect(gainNode);
      gainNode.connect(analyser);

      const destination = audioContext.createMediaStreamDestination();
      gainNode.connect(destination);
      outputStreamRef.current = destination.stream;

      mediaRecorderRef.current = new MediaRecorder(outputStreamRef.current);
      mediaRecorderRef.current.ondataavailable = (event) => {
        recordedChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        recordedChunks.current = []; // Clear chunks after recording
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      updateAudioLevel(); // Start updating decibel meter during recording
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // Play back the recorded audio
  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  // Define fixed colors for each box
const getStaticColorForSegment = (index) => {
  if (index < 3) return 'rgb(0, 255, 0)';       // Green for the first 3 boxes
  if (index < 6) return 'rgb(255, 255, 0)';     // Yellow for the middle 3 boxes
  return 'rgb(255, 0, 0)';                      // Red for the last 3 boxes
};


  const getGradientColor = (level) => {
    if (level <= 50) {
      // Green to Yellow (0, 255, 0) -> (255, 255, 0)
      const ratio = level / 50;
      const r = Math.round(255 * ratio); // Red increases
      const g = 255; // Green remains full
      const b = 0;   // Blue remains 0
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Yellow to Red (255, 255, 0) -> (255, 0, 0)
      const ratio = (level - 50) / 50;
      const r = 255; // Red remains full
      const g = Math.round(255 - 255 * ratio); // Green decreases
      const b = 0;   // Blue remains 0
      return `rgb(${r}, ${g}, ${b})`;
    }
  };
  
// Generate the meter segments based on static gradient colors
const getMeterSegments = (level) => {
  const segments = [];
  const numSegments = segmentColors.length;   // We have 9 predefined colors
  const segmentStep = 100 / numSegments;      // Each box represents a portion of the level

  for (let i = 0; i < numSegments; i++) {
    const segmentLevel = (i + 1) * segmentStep;  // Threshold level for each segment
    const color = level >= segmentLevel ? segmentColors[i] : 'gray'; // Light up if level is reached
    segments.push(
      <Box
        key={i}
        sx={{
          width: '30px',
          height: '30px',
          backgroundColor: color,  // Use color if active, gray if not
          margin: '2px',
        }}
      />
    );
  }
  return segments;
};

  
  useEffect(() => {
    if (isTestingMic) {
      updateAudioLevel(); // Start updating levels when mic test is active
    }
  }, [isTestingMic]);

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          {getMeterSegments(audioLevel)}
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
