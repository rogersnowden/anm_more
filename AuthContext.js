import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [ownsProduct, setOwnsProduct] = useState(false);
  const [libraryItems, setLibraryItems] = useState();

  console.log("AuthProvider isLoggedIn: ", isLoggedIn);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, setIsLoggedIn, 
      userName, setUserName,
      firstName, setFirstName,
      isVerified, setIsVerified, 
      ownsProduct, setOwnsProduct,
      libraryItems, setLibraryItems }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
