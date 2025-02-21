import React, { useState, useEffect, useContext } from 'react';
import ProdService from "./services/prod.service";
import { AuthContext } from './AuthContext';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import Library from './Library';
import CatalogOfferings from './CatalogOfferings';

export default function AnmHome() {
  console.log("AnmHome rendering");
  const { isLoggedIn, userName, catalog } = useContext(AuthContext);
  const [libraryItems, setLibraryItems] = useState([]);
  const [tabIndex, setTabIndex] = useState(1); // Default to Available Books

  useEffect(() => {
    if (isLoggedIn && userName) {
      const fetchLibrary = async () => {
        try {
          const data = await ProdService.getLibrary(userName);
          setLibraryItems(data.librarycontents || []);
        } catch (error) {
          setLibraryItems([]);
        }
      };
      fetchLibrary();
    }
  }, [isLoggedIn, userName]);

  useEffect(() => {
    if (libraryItems.length > 0) {
      const hasUnrecordedBooks = libraryItems.some(book => !book.isRecorded);
      setTabIndex(hasUnrecordedBooks ? 0 : 1);
    } else {
      setTabIndex(1); // Default to Available Books
    }
  }, [libraryItems]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Tabs value={tabIndex} onChange={(event, newValue) => setTabIndex(newValue)} centered>
        <Tab label="My Library" disabled={!isLoggedIn} />
        <Tab label="Available Books" />
      </Tabs>

      {tabIndex === 0 && isLoggedIn && <Library items={libraryItems} />}
      {tabIndex === 1 && <CatalogOfferings books={catalog} />}
    </Box>
  );
};
