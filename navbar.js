import React, { useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CssBaseline, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

import './App.css';
//import "./styles.css";
import { fabClasses } from "@mui/material";

//const theme = createTheme();
const theme = createTheme({
  palette: {
    secondary: {
      main: '#ffffff'
    },
    backgroundColor: {
      default: "ffffff"
    },
  }
});

const useStyles = makeStyles((theme) => ({
    navlinks: {
        marginLeft: theme.spacing(10),
        display: "flex",
      },
     logo: {
        flexGrow: "1",
        cursor: "pointer",
      },
      link: {
        textDecoration: "none",
        color: "black",
        fontSize: "20px",
        marginLeft: theme.spacing(20),
        "&:hover": {
          color: "yellow",
          borderBottom: "1px solid white",
        },
      },
      appBarHide: {
        opacity: 0,
        backgroundColor: "#FFFFFF",
        background: "transparent",
        boxShadow: "none",
        position: "sticky",
      },
      appBarShow: {
        opacity: 1,
        color: '#ffffff',
        backgroundColor: "#E0ECF3",
        background: "#83CDF6",
        boxShadow: "none",
        position: "sticky",
      
      },
      appBar: {
        paddingBottom: '15vw',
        marginBottom: '10vw',
        color: '#83CDF6',
        backgroundColor: "#E0ECF3!",
        background: "#83CDF6",
      },
    }));

      function Navbar(props) {

        function goHome() {
          console.log("go home called");
        };

        function goBook() {
          console.log("go book called");
        };

        console.log("here, init someDeal : " + props.someDeal);

        const [whichAppBar, setWhichAppBar] = useState('appBar-show');
        const classes = useStyles();
        const [isVisible, setIsVisible] = useState(1);

        useEffect(() => {
          if (whichAppBar === 'appBar-show' ) {
            const timer = setTimeout(() => {
              console.log('Run after 5 sec');
              setWhichAppBar('appBar-hide');
            }, 5000);
            return () => clearTimeout(timer);
          }
        }, [whichAppBar]);

        useEffect(() => {
          if (isVisible === 1) {
            const timer = setTimeout(() => {
              console.log('Run after 5 sec');
              setIsVisible(0);
            }, 5000);
            return () => clearTimeout(timer);
          }
        }, [isVisible]);

        function makeAppBarShow() {
            setIsVisible(1);
        };
    
        return (
          <AppBar width='100%' position="static" 
              style={{opacity: `${isVisible}`, zIndex: 1251}}
                    className={whichAppBar} onClick={makeAppBarShow}>
            <CssBaseline />
            <Toolbar >
              <Typography variant="h5" className={classes.logo}>
                Always Near Me {whichAppBar}
              </Typography>
                <div className={classes.navlinks}>
                  <Link to="/AnmHome" className={classes.link}>
                    Home
                  </Link>
                  <Link to="/AnmAbout" className={classes.link}>
                    About
                  </Link>
                  <Link to="/AnmBook" className={classes.link}>
                    Book
                  </Link>
                  <Link to="/AnmProfile" className={classes.link}>
                    Profile
                  </Link>
                </div>
            </Toolbar>
          </AppBar>
        );
      }
export default Navbar;
      