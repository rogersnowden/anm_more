import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AnmLogin from './Login';
import AnmLogout from './Logout';
import SquareIcon from '@mui/icons-material/Square';

import AnmProfile from './AnmProfile';
import AnmSettings from './AnmSettings';
import AnmHome from './AnmHome';
import AnmAbout from './AnmAbout';
import AnmRegister from './AnmRegister';
import AnmBook from './AnmBook';
import AnmRecord from './AnmRecord';
import AnmShop from './AnmShop';
import AnmNotifications from './AnmNotifications';

import './App.css';

export default function MenuAppBar (props)  {

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  
  // auth default 'true' while developing only
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMain, setAnchorElMain] = useState(null);
  const [isShowingBar, setShowingBar] = useState(false);
  const [whichPage, setWhichPage] = useState(<AnmHome />);

  // setting icon open drop down menu of its own
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  // messageCount comes from profile, after login. Dummy '2' for testing, remove later
  const [messageCount, setMessageCount] = useState(2);
//  const [messageCount, setMessageCount] = useState();

//  const [key, setKey] = useState(0);
  const key = {};

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuMain = (event) => {
    setAnchorElMain(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMain = () => {
    setAnchorElMain(null);
  };

  const handleSettingsMenuOpen = (event) => {
    setSettingsMenuOpen(true);
  };
  
  const handleSettingsMenuClose = () => {
    setSettingsMenuOpen(false);
  };

  const handleNotifications = () => {
    console.log(<AnmNotifications key={Date.now()} />);
  };

  const anmHome = () => {
    setWhichPage(<AnmHome key={Date.now()} />);
    handleCloseMain();
};

  const anmBook = () => {
    setWhichPage(<AnmBook key={Date.now()} />);
    handleCloseMain();
};

const anmShop = () => {
  setWhichPage(<AnmShop key={Date.now()} />);
  handleCloseMain();
};

const anmRecord = () => {
  setWhichPage(<AnmRecord key={Date.now()} />);
  handleCloseMain();
};

const anmAbout = () => {
  setWhichPage(<AnmAbout key={Date.now()} />);
  handleCloseMain();
};

const anmRegister = () => {
  setWhichPage(<AnmRegister key={Date.now()} />);
  handleCloseMain();
};

const anmLogin = () => {
  setWhichPage(<AnmLogin key={Date.now()} />);
  handleCloseMain();
};

const anmLogout = () => {
  setWhichPage(<AnmLogout key={Date.now()} />);
  handleCloseMain();
};

const anmSettings = () => {
  setWhichPage(<AnmSettings key={Date.now()} />);
  handleCloseMain();
};

const anmProfile = () => {
  setWhichPage(<AnmProfile key={Date.now()} />);
  handleCloseMain();
};

const anmNotifications = () => {
  setWhichPage(<AnmNotifications key={Date.now()} />);
  handleCloseMain();
};

useEffect(() => {
  console.log("set logged in status: ", isLoggedIn);
}, [isLoggedIn]);


const showPage = () => {
    //console.log('show page: ' + whichPage.type.name);
    return(
      <div >
        {whichPage}
      </div>);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div >
        <AppBar width='100%' position="static" 
            className={ isShowingBar ? 'alert-shown' : 'alert-hidden'}
                >
          <Toolbar sx={{zIndex: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu-hamburger"
              aria-controls="menu-appbar-hamburger"
              aria-haspopup="true"
              sx={{ mr: 2 }}
            >
              <MenuIcon onClick={handleMenuMain} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ANM
            </Typography>
            <Menu
                    id="menu-appbar-hamburger"
                    anchorEl={anchorElMain}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElMain)}
                    onClose={handleCloseMain}
              >
                    <MenuItem onClick={anmHome}>Home</MenuItem>
                    {isLoggedIn ? ( 
                      <>
                    <MenuItem onClick={anmLogout}>Logout</MenuItem>
                    </>
                    ) : (
                      <>
                    <MenuItem onClick={anmLogin}>Login</MenuItem>
                    </>
                    )}
                    <MenuItem onClick={anmShop}>Shop</MenuItem>
                    <MenuItem onClick={anmBook}>Book</MenuItem>
                    <MenuItem onClick={anmRecord}>Record</MenuItem>
                    <MenuItem onClick={anmAbout}>About</MenuItem>
                    <MenuItem onClick={anmRegister}>Reg</MenuItem>
                  </Menu>

            {auth && (
              <div>
            {isLoggedIn ? (
              <>
                <IconButton
                  size="large"
                  aria-label="login user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <LogoutIcon onClick={anmLogout} />
                </IconButton>
                {/* Other icons for authenticated users */}
                  </>
                ) : (
                  <>
                <IconButton
                  size="large"
                  aria-label="login user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <SquareIcon
                    sx={{
                      color: '#ff0000', // Set the desired color for the circle icon
                      position: 'absolute',
                      zIndex: -1,
                      fontSize: '3rem',
                    }}
                  />
                  <LoginIcon onClick={anmLogin} />
                </IconButton>
                {/* Other icons for non-authenticated users */}
                    </>
                  )}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleSettingsMenuOpen}
                  color="inherit"
                  disabled={!isLoggedIn}
                >
                  <SettingsIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={settingsMenuOpen}
                  onClose={handleSettingsMenuClose}
                >
                  <MenuItem onClick={anmSettings}>Settings</MenuItem>
                  <MenuItem onClick={anmProfile}>Profile</MenuItem>
                  {/* Add more MenuItems here */}
                </Menu>
                <IconButton
                  size="large"
                  aria-label="profile of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  disabled={!isLoggedIn} 
                >
          <Badge
            badgeContent={messageCount}
            color='error'
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            style={{ visibility: isLoggedIn ? 'visible' : 'hidden' }}
            > 
              <PersonIcon onClick={anmProfile} />
          </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {showPage()}
      </div>
    </Box>
  );
}
