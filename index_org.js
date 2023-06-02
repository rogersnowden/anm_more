import React from "react";
import ReactDOM from "react-dom";

//import App from "./App";
//import AnmHome from "./AnmHome";
import Home from "./AnmHome";

const rootElement = document.getElementById("root");
document.body.style.backgroundColor = "#E0ECF3";
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  rootElement
);
