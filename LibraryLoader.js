// LibraryLoader.js
import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import ProdService from "./services/prod.service";

const LibraryLoader = ({ children }) => {
  const { isLoggedIn, userName } = useContext(AuthContext);
  const [libraryItems, setLibraryItems] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      ProdService.getLibrary(userName, (error, data) => {
        if (error) {
          setLibraryItems([]);
          // Handle the error as needed
        } else {
          setLibraryItems(data);
        }
      });
    } 
  }, [isLoggedIn, userName]);

  return children({ libraryItems });
};

export default LibraryLoader;
