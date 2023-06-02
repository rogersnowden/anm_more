import React, { Component, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import Tabs from 'material-ui/Tabs/Tabs';
//import Tab from 'material-ui/Tabs/Tab';
//import Menu from 'material-ui/svg-icons/navigation/menu';
import Menu from '@mui/material/Menu';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const App = () => (
  <div>
    <h2>About</h2>
  </div>
);

const AppBarComponent = (props) =>  {

    const [logged, setLogged] = useState(true);

    const handleChange = () => {
        setLogged(true);
    };

    return (
      <Router>
        <div>
          <AppBar
            title="Title"
            iconElementLeft={
              <MenuIcon
                iconButtonElement={<IconButton className='.mobileNav'><Menu /></IconButton>}
                iconStyle={{ color: '#fff' }}
              >
                <MenuItem primaryText="Menu Item 1" />
                <MenuItem primaryText="Menu Item 2" />
              </MenuIcon>
          }
          >
          </AppBar>
          <Route exact path="/" component={App} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
  

export default AppBarComponent;