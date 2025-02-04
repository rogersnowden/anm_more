// AnmShare.js
import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from '@mui/styles';
import createBreakpoints from '@mui/system/createTheme/createBreakpoints';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Button, TextField, Typography, IconButton, Grid, List, ListItem, ListItemText, Pagination, Paper } from '@mui/material';
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
  contactListContainer: {
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    [breakpoints.up('xs')]: {
      borderColor: 'green',
    },
    [breakpoints.up('sm')]: {
      borderColor: 'blue',
    },
    [breakpoints.up('md')]: {
      borderColor: 'red',
    },
    [breakpoints.up('lg')]: {
      borderColor: 'yellow',
    },
    [breakpoints.up('xl')]: {
      borderColor: 'orange',
    },
  },
  contactListItem: {
    marginBottom: '8px',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    [breakpoints.up('xs')]: {
      borderColor: 'green',
    },
    [breakpoints.up('sm')]: {
      borderColor: 'blue',
    },
    [breakpoints.up('md')]: {
      borderColor: 'red',
    },
    [breakpoints.up('lg')]: {
      borderColor: 'yellow',
    },
    [breakpoints.up('xl')]: {
      borderColor: 'orange',
    },
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
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
  const [contacts, setContacts] = useState([]);  // State to store all contacts
  const [filteredContacts, setFilteredContacts] = useState([]);  // State for filtered contacts
  const [searchQuery, setSearchQuery] = useState('');  // State for search query
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);  // State for pagination
  const [contactsPerPage] = useState(10);  // Number of contacts per page
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

  const fetchAllContacts = async () => {
    let allContacts = [];
    let nextPageToken = '';

    do {
      const response = await gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 100,
        pageToken: nextPageToken,
        personFields: 'names,emailAddresses',
      });
      const connections = response.result.connections || [];
      allContacts = [...allContacts, ...connections.map(person => ({
        name: person.names ? person.names[0].displayName : "No Name",
        email: person.emailAddresses ? person.emailAddresses[0].value : "No Email"
      }))];
      nextPageToken = response.result.nextPageToken || '';
    } while (nextPageToken);

    setContacts(allContacts);
    setFilteredContacts(allContacts);
  };

  const handleGoogleContacts = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      fetchAllContacts().catch(error => {
        console.error("Error fetching contacts: ", error);
      });
    });
  };

  const handleSelectContact = (contact) => {
    setName(contact.name);
    setEmail(contact.email);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = contacts.filter(contact => 
      contact.name.toLowerCase().includes(query)
    );
    setFilteredContacts(filtered);
    setCurrentPage(1);  // Reset to first page on new search
  };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

  const handleSubmit = () => {
    if (!email) {
      alert('Please select a contact or enter an email address.');
      return;
    }
  
    const bccEmail = "your-bcc-email@example.com";  // Replace with the actual BCC email address
    const subject = encodeURIComponent("Sharing Your E-Book");
    const body = encodeURIComponent(`Dear ${name},\n\n${message}\n\nBest regards,\n${firstName}`);
    
    // Construct the mailto link with BCC
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}&bcc=${bccEmail}`;
    
    // Open the mail client with pre-filled content
    window.location.href = mailtoLink;
  };

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
                    <Paper className={classes.contactListContainer} elevation={3}>
                      <List className={classes.contactList}>
                        {currentContacts.map((contact, index) => (
                          <ListItem key={index} onClick={() => handleSelectContact(contact)} className={classes.contactListItem}>
                            <ListItemText primary={contact.name} secondary={contact.email} />
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                    <div className={classes.paginationContainer}>
                      <Pagination
                        count={Math.ceil(filteredContacts.length / contactsPerPage)}
                        page={currentPage}
                        onChange={paginate}
                        color="primary"
                      />
                    </div>
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
