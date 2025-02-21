import { createContext, useState, useEffect } from 'react';
import ProdService from './services/prod.service';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [baseURL] = useState(window.location.origin);
  const [APIURL] = useState('https://localhost:4000/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [libraryItems, setLibraryItems] = useState([]);
  const [catalog, setCatalog] = useState([]);

  // Function to load the catalog (can be called on demand)
  const loadCatalog = async () => {
    try {
      const data = await ProdService.getCatalog();
      setCatalog(data || []);
      console.log("Catalog fetched:", data);
    } catch (error) {
      console.log("Error fetching catalog:", error);
      setCatalog([]);
    }
  };

  // Fetch catalog at startup
  useEffect(() => {
    loadCatalog();
  }, []);

  // Fetch library when the user logs in
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

  return (
    <AuthContext.Provider value={{ 
      baseURL,
      APIURL,
      isLoggedIn, setIsLoggedIn, 
      userName, setUserName,
      firstName, setFirstName,
      libraryItems, setLibraryItems,
      catalog, setCatalog, loadCatalog // ✅ Added loadCatalog function
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
