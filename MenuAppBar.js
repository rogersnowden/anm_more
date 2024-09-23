import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import ProdService from "./services/prod.service";
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
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SquareIcon from '@mui/icons-material/Square';
import AnmLogin from './Login';
import AnmLogout from './Logout';
import AnmProfile from './AnmProfile';
import AnmSettings from './AnmSettings';
import AnmHome from './AnmHome';
import AnmAbout from './AnmAbout';
import AnmRegister from './AnmRegister';
import AnmPasswordRecover from './AnmPasswordRecover';
import AnmBook from './AnmBook';
import AnmLevel from './AnmLevel'; // Updated AnmLevel
import AnmRecord from './AnmRecord';
import AnmShare from './AnmShare';
import AnmShop from './AnmShop';
import AnmNotifications from './AnmNotifications';

import './App.css';

export default function MenuAppBar(props) {
  const { baseURL, setBaseURL } = useContext(AuthContext);
  const { APIURL } = useContext(AuthContext);
  const { userName, setUserName } = useContext(AuthContext);
  const { firstName, setFirstName } = useContext(AuthContext);
  const { isVerified, setIsVerified } = useContext(AuthContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { ownsProduct, setOwnsProduct } = useContext(AuthContext);
  const { userBook, setUserBook } = useContext(AuthContext);
  const { wasCancelled, setWasCancelled } = useContext(AuthContext);
  const { productSKU, setProductSKU } = useContext(AuthContext);
  const { productResponse, setProductResponse } = useContext(AuthContext);
  // auth default 'true' while developing only
  const [auth, setAuth] = useState(true);

  const [libraryItems, setLibraryItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMain, setAnchorElMain] = useState(null);
  const [isShowingBar, setShowingBar] = useState(false);
  const [whichPage, setWhichPage] = useState();
  const [openAnmLevel, setOpenAnmLevel] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);

  // New state to control AnmLevel popup visibility
  const [isAnmLevelOpen, setIsAnmLevelOpen] = useState(false);

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [messageCount, setMessageCount] = useState(2);

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn, "userName: ", userName);
    if (isLoggedIn && userName) {
      const fetchLibrary = async () => {
        try {
          const data = await ProdService.getLibrary(userName);
          console.log("getLibrary successful", data);
          setLibraryItems(data);
        } catch (error) {
          setLibraryItems([]);
          setMessage(`Library for user ${userName} not found`);
          setMessageDialogOpen(true);
          console.error("Error fetching library:", error);
        }
      };
      fetchLibrary();
    } else {
      setLibraryItems(null);
    }
  }, [isLoggedIn, userName]);

  useEffect(() => {
    if (userBook) {
      if (productResponse === 'record') {
        anmRecord({ userName, productSKU });
      } else if (productResponse === 'share') {
        anmShare(userName, productSKU);
      }
    }
  }, [userBook, userName, productSKU, productResponse]);

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
    setWhichPage(<AnmHome key={Date.now()} libraryItems={libraryItems} />);
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

  // Modified anmLevel to open the Dialog version of AnmLevel
  const handleAnmLevelOpen = () => {
    setOpenAnmLevel(true);
    handleCloseMain();
  };

  const handleAnmLevelClose = () => {
    setOpenAnmLevel(false);
  };

  const anmRecord = ({ userName, productSKU }) => {
    setWhichPage(<AnmRecord key={Date.now()} userName={userName} productSKU={productSKU} />);
    handleCloseMain();
  };

  const anmShare = ({ userName, productSKU }) => {
    setWhichPage(<AnmShare key={Date.now()} userName={userName} productSKU={productSKU} />);
    handleCloseMain();
  };

  const anmAbout = () => {
    setWhichPage(<AnmAbout key={Date.now()} />);
    handleCloseMain();
  };

  const anmRegister = () => {
    setRegisterDialogOpen(true);
    handleCloseMain();
  };

  const anmPasswordRecover = () => {
    setWhichPage(<AnmPasswordRecover key={Date.now()} />);
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
    if (wasCancelled) {
      anmHome();
      setWasCancelled(false);
    }
  }, [wasCancelled]);

  useEffect(() => {
    if (isLoggedIn && libraryItems) {
      anmHome();
    }
  }, [libraryItems]);

  const showPage = () => {
    return (
      <div>
        {whichPage}
      </div>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>
        <AppBar width='100%' position="static" className={isShowingBar ? 'alert-shown' : 'alert-hidden'}>
          <Toolbar sx={{ zIndex: 1, display: 'flex', alignItems: 'center' }}>
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
            {isLoggedIn && (
              <Typography variant="body1" sx={{ mr: 2 }}>
                {firstName}
              </Typography>
            )}
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
              <MenuItem onClick={handleAnmLevelOpen}>Audio Level</MenuItem>
              <MenuItem onClick={anmRecord}>Record</MenuItem>
              <MenuItem onClick={anmAbout}>About</MenuItem>
              <MenuItem onClick={anmRegister}>Reg</MenuItem>
              <MenuItem onClick={anmPasswordRecover}>Reco</MenuItem>
            </Menu>
            {auth && (
              <div>
                {isLoggedIn ? (
                  <>
                    <IconButton
                      size="large"
                      aria-label="logout user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <LogoutIcon onClick={anmLogout} />
                    </IconButton>
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
                <Menu anchorEl={anchorEl} open={settingsMenuOpen} onClose={handleSettingsMenuClose}>
                  <MenuItem onClick={anmSettings}>Settings</MenuItem>
                  <MenuItem onClick={anmProfile}>Profile</MenuItem>
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
                  <Badge badgeContent={messageCount} color="error" anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
                    <PersonIcon onClick={anmProfile} />
                  </Badge>
                </IconButton>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {showPage()}
        {registerDialogOpen && <AnmRegister onClose={() => setRegisterDialogOpen(false)} />}

        {/* Render the AnmLevel Dialog when open */}
          <AnmLevel open={openAnmLevel} onClose={handleAnmLevelClose} />
      </div>
    </Box>
  );
}
