import React, { useState } from 'react';
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
import AnmLogin from './AnmLogin';
import AnmProfile from './AnmProfile';
import AnmSettings from './AnmSettings';
import AnmHome from './AnmHome';
import AnmAbout from './AnmAbout';
import AnmBook from './AnmBook';
import AnmRecord from './AnmRecord';
import AnmShop from './AnmShop';
import AnmNotifications from './AnmNotifications';

import './App.css';

export default function MenuAppBar (props)  {
  
  // auth default 'true' while developing only
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMain, setAnchorElMain] = useState(null);
  const [isShowingBar, setShowingBar] = useState(false);
  const [whichPage, setWhichPage] = useState(<AnmHome />);

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

  const handleNotifications = () => {
    console.log(<AnmNotifications />);
  };

  const anmHome = () => {
    setWhichPage(<AnmHome />);
    handleCloseMain();
};

  const anmBook = () => {
    setWhichPage(<AnmBook />);
    handleCloseMain();
};

const anmShop = () => {
  setWhichPage(<AnmShop />);
  handleCloseMain();
};

const anmRecord = () => {
  setWhichPage(<AnmRecord />);
  handleCloseMain();
};

const anmAbout = () => {
  setWhichPage(<AnmAbout />);
  handleCloseMain();
};

const anmLogin = () => {
  setWhichPage(<AnmLogin />);
  handleCloseMain();
};

const anmSettings = () => {
  setWhichPage(<AnmSettings />);
  handleCloseMain();
};

const anmProfile = () => {
  setWhichPage(<AnmProfile />);
  handleCloseMain();
};

const anmNotifications = () => {
  setWhichPage(<AnmNotifications />);
  handleCloseMain();
};

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
            className={ {isShowingBar} ? 'alert-shown' : 'alert-hidden'}
                >
          <Toolbar>
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
                    <MenuItem onClick={anmShop}>Shop</MenuItem>
                    <MenuItem onClick={anmBook}>Book</MenuItem>
                    <MenuItem onClick={anmRecord}>Record</MenuItem>
                    <MenuItem onClick={anmAbout}>About</MenuItem>
                  </Menu>

            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="login user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <LoginIcon onClick={anmLogin} />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <SettingsIcon onClick={anmSettings} />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="profile of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <PersonIcon onClick={anmProfile} />
                </IconButton>
                <Badge badgeContent={4} color='error' anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                  <NotificationsIcon  onClick={anmNotifications} />
                </Badge>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {showPage()}
      </div>
    </Box>
  );
}
