import React, { useState, useRef, useContext, useEffect } from 'react';
import { Box, Slider, Typography, Button } from '@mui/material';
import { AuthContext } from './AuthContext';

export default function AnmLevel({ onClose }) {
  const { micLevel, setMicLevel } = useContext(AuthContext); // Use micLevel from context
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null); // Store the recorded audio blob
  const [audioLevel, setAudioLevel] = useState(0); // Decibel meter level
  const [isPlaying, setIsPlaying] = useState(false); // State to track if audio is playing
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
  const frameRequestRef = useRef(null); // To store requestAnimationFrame for cleanup

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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream; // Save the mic stream for the test
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Create media source, analyser, and gain nodes
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser); // Connect directly to analyser for the mic test

      // Initialize the data array for decibel meter updates
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Start updating the decibel meter
      updateAudioLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
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

    // Keep updating the meter
    frameRequestRef.current = requestAnimationFrame(updateAudioLevel);
  };

  // Automatically start the mic test when the component is loaded
  useEffect(() => {
    const activateAudioContext = async () => {
      await setupMicTest();
    };

    activateAudioContext();

    return () => {
      // Clean up microphone stream and animation frame on unmount
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current); // Cancel the animation frame
      }
      if (audioContextRef.current) {
        audioContextRef.current.close(); // Close the audio context if it's open
      }
    };
  }, []);

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

      // Disable the button during playback
      setIsPlaying(true);

      // Add event listeners to re-enable the button after playback
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onpause = () => setIsPlaying(false);
    }
  };

  // Handle the "Done" button to finalize the mic level and save it to context
  const handleDone = () => {
    console.log('Microphone level set to:', micLevel);
    setMicLevel(micLevel); // Save mic level to context
    onClose(); // Call the onClose prop to close the component
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

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ marginLeft: '30px', marginRight: '30px', marginTop: '30px', marginBottom: '30px' }}
      >
        Set Microphone Level
      </Typography>

      {/* Instructions Section */}
      <Box 
      sx={{ textAlign: 'left', padding: '10px', marginBottom: '10px', borderRadius: '8px' }}
      >
        <Typography style={{ fontSize: '20px', color: 'black', marginBottom: '10px' }}>
          <p>Adjust Microphone Level</p>
          <p>Speak into your microphone, reading the line in the box below. Adjust your device volume level to the middle of the range. If the red boxes light, reduce the microphone volume until the highest values are orange.</p>
        </Typography>
      </Box>

      {/* Mic Test Text */}
      <Box
        sx={{
          border: '2px solid black',
          padding: '10px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'center', // Center the content horizontally
          alignItems: 'center', // Center vertically
          borderRadius: '8px', // Rounded corners for better aesthetics
          width: 'fit-content', // Adjust box size to fit the text content
          margin: '0 auto', // Center the box horizontally on the page
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: 'black', fontStyle: 'italic', fontWeight: 'bold', textAlign: 'center' }} // Center the text
        >
          "The quick brown fox jumps over the lazy dog."
        </Typography>
      </Box>

      {/* Instructions for Testing */}
      <Box
        sx={{
          textAlign: 'left',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '8px',
        }}
      >
        <Typography
          sx={{ fontSize: '20px', color: 'black', marginBottom: '10px' }}
        >
          <p>Test Recording</p>
          <p>Click the "Start Recording" button and speak the line into your microphone again. Then click "Stop Recording" and "Playback Audio" to review the sound level. Use the Adjust Volume slider to fine tune.</p>
        </Typography>
      </Box>

      {/* Decibel Meter for Mic Test */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        {getMeterSegments(audioLevel)}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          marginBottom: '20px'
        }}
      >
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
        <Typography variant="body1">Adjust Volume:</Typography>
        <Slider
          value={micLevel} // Use micLevel from context
          min={0}
          max={100}
          onChange={handleVolumeChange}
          aria-labelledby="volume-slider"
          sx={{ width: '300px' }} // Adjust slider width
        />
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          Current Volume: {micLevel}
        </Typography>
      </Box>

      {/* Playback and Done Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={playRecording}
          disabled={!audioBlob || isPlaying} // Disable the button if no audio has been recorded or during playback
          sx={{ marginRight: '10px' }}
        >
          Playback Audio
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleDone}
        >
          Done
        </Button>
      </Box>

      <audio ref={audioRef} controls style={{ display: 'none' }} />
    </Box>
  );
}
