import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, TextField, Typography, IconButton, Grid, List, ListItem, ListItemText } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { AuthContext } from './AuthContext';
import Spinner from './Spinner_ANM';
import { gapi } from 'gapi-script';

const breakpoints = createBreakpoints({});

const theme = createTheme({
  palette: {
    secondary: {
      main: '#E33E7F'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  upperBezel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35vw',
    height: '52vw',
    border: 'solid 3px #0ff',
    backgroundColor: 'white',
    zIndex: 3,
    [breakpoints.up('xs')]: {
      top: '50%',
      left: '50%',
      height: '52vh',
      width: '45vh',
      borderColor: 'green',
    },
    [breakpoints.up('sm')]: {
      height: '52vh',
      width: '45vh',
      borderColor: 'blue',
    },
    [breakpoints.up('md')]: {
      height: '52vh',
      width: '45vh',
      borderColor: 'red',
    },
    [breakpoints.up('lg')]: {
      height: '52vh',
      width: '45vh',
      borderColor: 'yellow',
    },
    [breakpoints.up('xl')]: {
      height: '52vh',
      width: '45vh',
      borderColor: 'orange',
    },
  },
  container: {
    padding: '20px',
  },
  titleText: {
    fontSize: '1.5rem',
    textAlign: "center",
    marginBottom: '1rem',
    color: 'black',
  },
  textField: {
    marginBottom: '1rem',
  },
  buttonContainer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
  iconButton: {
    position: 'absolute',
    top: '-5%',
    right: '-5%',
    zIndex: 1,
  },
  contactList: {
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '1rem',
  },
}));

const CLIENT_ID = '573862915884-k4bvupi40rb0iamkdnne2ue60pk4r0eh.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/contacts.readonly";

export default function AnmShare({ userName, productSKU }) {
  const classes = useStyles();
  const [showComponent, setShowComponent] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState([]);  // State to store contacts
  const [filteredContacts, setFilteredContacts] = useState([]);  // State for filtered contacts
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [isLoading, setIsLoading] = useState(false);
  const { firstName } = useContext(AuthContext);
  const [title, setTitle] = useState('Share Your Book');

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  // Handle Google Sign-In and access contacts
  const handleGoogleContacts = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 100,
        personFields: 'names,emailAddresses',
      }).then(response => {
        const connections = response.result.connections;
        if (connections) {
          const contactList = connections.map(person => {
            const name = person.names ? person.names[0].displayName : "No Name";
            const email = person.emailAddresses ? person.emailAddresses[0].value : "No Email";
            return { name, email };
          });
          setContacts(contactList);
          setFilteredContacts(contactList);  // Initially, all contacts are shown
        } else {
          console.log("No connections found.");
        }
      }).catch(error => {
        console.error("Error fetching contacts: ", error);
      });
    });
  };

  // Handle contact selection
  const handleSelectContact = (contact) => {
    setName(contact.name);
    setEmail(contact.email);
  };

  // Handle search query input and filter contacts
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
  };

  // Placeholder for submitting the form
  const handleSubmit = () => {
    console.log('Submit the form');
    // Logic to create and send the shareable link goes here
  };

  // Handle component cancel
  const handleCancel = () => {
    setShowComponent(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {showComponent && (
        <div className="App">
          {isLoading ? (
            <Spinner />
          ) : (
            <Box className={classes.upperBezel}>
              <IconButton onClick={handleCancel} className={classes.iconButton}>
                <CancelIcon />
              </IconButton>
              <div className={classes.container}>
                <Typography className={classes.titleText}>
                  {title} - {productSKU}
                </Typography>
                <TextField
                  className={classes.textField}
                  label="Name"
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  className={classes.textField}
                  label="Message"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleGoogleContacts}>
                  Import from Google Contacts
                </Button>
                
                {contacts.length > 0 && (
                  <div>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search contacts"
                      value={searchQuery}
                      onChange={handleSearch}
                      margin="normal"
                    />
                    <List className={classes.contactList}>
                      {filteredContacts.map((contact, index) => (
                        <ListItem key={index} onClick={() => handleSelectContact(contact)}>
                          <ListItemText primary={contact.name} secondary={contact.email} />
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )}

                <Grid container className={classes.buttonContainer}>
                  <Button
                    variant="contained"
                    className={classes.submitButton}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Grid>
              </div>
            </Box>
          )}
        </div>
      )}
    </ThemeProvider>
  );
}
