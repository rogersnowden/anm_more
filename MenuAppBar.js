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
import AnmLevel from './AnmLevel';  // Import the AnmLevel component
import AnmHome from './AnmHome';
import AnmRecord from './AnmRecord';

export default function MenuAppBar (props)  {

  const { userName, productSKU, isLoggedIn } = useContext(AuthContext);
  const [libraryItems, setLibraryItems] = useState([]);
  const [anchorElMain, setAnchorElMain] = useState(null);
  const [whichPage, setWhichPage] = useState();

  useEffect(() => {
    // Fetch library or other side-effects here...
  }, [isLoggedIn, userName]);

  const handleMenuMain = (event) => {
    setAnchorElMain(event.currentTarget);
  };

  const handleCloseMain = () => {
    setAnchorElMain(null);
  };

  const anmHome = () => {
    setWhichPage(<AnmHome key={Date.now()} libraryItems={libraryItems} />);
    handleCloseMain();
  };

  const anmRecord = ({userName, productSKU}) => {
    setWhichPage(<AnmRecord key={Date.now()} userName={userName} productSKU={productSKU} />);
    handleCloseMain();
  };

  // Modify the anmLevel function to pass a close function to AnmLevel
  const anmLevel = () => {
    setWhichPage(<AnmLevel key={Date.now()} onClose={() => setWhichPage(null)} />); // Pass onClose to AnmLevel
    handleCloseMain();
  };

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
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu-hamburger"
              aria-controls="menu-appbar-hamburger"
              aria-haspopup="true"
              sx={{ mr: 2 }}
              onClick={handleMenuMain}
            >
              <MenuIcon />
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
              <MenuItem onClick={anmRecord}>Record</MenuItem>
              <MenuItem onClick={anmLevel}>Adjust Mic Levels</MenuItem> {/* New Menu Item */}
            </Menu>
          </Toolbar>
        </AppBar>
        {showPage()}
      </div>
    </Box>
  );
}
