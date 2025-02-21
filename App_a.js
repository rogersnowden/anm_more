import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthProvider } from "./AuthContext";
import MenuAppBar from "./MenuAppBar";
import AnmHome from "./AnmHome";
import PwdSet from "./PwdSet";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#E33E7F",
    },
  },
});

export default function App() {
console.log("Start of App.js");
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AuthProvider>
          <Router>
            <MenuAppBar />
            {/* Always load AnmHome on startup */}
            <AnmHome />
            <Routes>
              <Route path="/pwdset/:token" element={<PwdSet />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
}
