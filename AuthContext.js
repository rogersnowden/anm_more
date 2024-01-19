import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [baseURL] = useState(window.location.origin);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [ownsProduct, setOwnsProduct] = useState(false);
  const [libraryItems, setLibraryItems] = useState();
  const [ wasCancelled, setWasCancelled] = useState(false);

  console.log("AuthProvider isLoggedIn: ", isLoggedIn);

  return (
    <AuthContext.Provider value={{ 
      baseURL,
      isLoggedIn, setIsLoggedIn, 
      userName, setUserName,
      firstName, setFirstName,
      isVerified, setIsVerified, 
      ownsProduct, setOwnsProduct,
      libraryItems, setLibraryItems,
      wasCancelled, setWasCancelled,
       }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
