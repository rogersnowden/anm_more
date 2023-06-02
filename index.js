import React from "react";
import ReactDOM from "react-dom";

import App from "./App_a";
//import App2 from "./App2";
//import App4 from './App4';
import AnmBook from "./AnmBook";
import AnmApp from "./AnmApp";


import MenuAppBar from "./MenuAppBar";

const rootElement = document.getElementById("root");
document.body.style.backgroundColor = "#E0ECF3";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
