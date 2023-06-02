import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import AnmHome from "./AnmHome";
import AnmAbout from "./AnmAbout";
import AnmShop from "./AnmShop";
import AnmBook from "./AnmBook";
import AnmRecord from "./AnmRecord";
import AnmProfile from "./AnmProfile";
import AnmSettings from "./AnmSettings";
import AnmNotifications from "./AnmNotifications";
import MenuAppBar from './MenuAppBar';

function AnmApp() {

  const [doHide, setDoHide] = useState(false);
  
  return (
      <MenuAppBar />
    );
}

export default AnmApp;