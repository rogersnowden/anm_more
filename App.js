import React, { useState, useEffect, useRef } from "react";
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
//import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuAppBar from './MenuAppBar';

import Slider from "react-slick";

import  { Container, ImageList }  from '@mui/material';
import { TextareaAutosize } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import Axios from "axios";
import Spinner from './Spinner_ANM';
import spinnerGif from './spinner.gif';

import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";


//const express = require('express');
//const app = express();


export default function App() {
  return (
    <div className="App">
      <h1>Hello, Mom!</h1>
    </div>
  );
}
