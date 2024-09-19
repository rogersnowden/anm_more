import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function AnmLevel({ onClose }) {
  const [audioLevel, setAudioLevel] = useState(0); // Decibel meter level
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const micStreamRef = useRef(null); // Store the microphone stream for the test
  const frameHistory = useRef([]); // Keep track of the last few frames
  const historySize = 10; // Adjust the size of the moving average window
  const frameRequestRef = useRef(null); // To store requestAnimationFrame for cleanup

  var maxlevel = 0;

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

      // Create media source and analyser node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
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

  const noiseThreshold = 125; // Set the threshold value (adjust for testing)

  // Adjust decibel calculation to increase scaling sensitivity and apply noise threshold
  const updateAudioLevel = () => {
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
  
      // Find the maximum decibel level for the current frame
      const currentMaxLevel = Math.max(...dataArrayRef.current);
  
      // Apply the noise threshold: ignore sounds below the threshold
      const processedLevel = currentMaxLevel >= noiseThreshold ? currentMaxLevel : 0;
  
      // Add the current max level to the frame history
      frameHistory.current.push(processedLevel);
  
      // Limit the history size to the last 'historySize' frames
      if (frameHistory.current.length > historySize) {
        frameHistory.current.shift(); // Remove the oldest frame
      }
  
      // Calculate the average over the stored frames (moving average)
      const movingAverageLevel = frameHistory.current.reduce((sum, value) => sum + value, 0) / frameHistory.current.length;
  
      // Scale the moving average to a 0-100 range, using log scaling for better sensitivity
      const scaledLevel = Math.min(100, (Math.log(movingAverageLevel + 1) / Math.log(256)) * 100);
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

  const handleDone = () => {
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
          <p>Speak into your microphone, reading the line in the box below.</p>
          <p>If the red boxes light, reduce the microphone volume until the highest values are orange.</p>
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
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={handleDone}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}
