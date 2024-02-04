import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [baseURL] = useState(window.location.origin);
  const [APIURL] = useState('https://localhost:4000/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [ownsProduct, setOwnsProduct] = useState(false);
  const [libraryItems, setLibraryItems] = useState();
  const [wasCancelled, setWasCancelled] = useState(false);
  const [productSKU, setProductSKU] = useState();
  const [productResponse, setProductResponse] = useState();

  console.log("AuthProvider isLoggedIn: ", isLoggedIn);

  return (
    <AuthContext.Provider value={{ 
      baseURL,
      APIURL,
      isLoggedIn, setIsLoggedIn, 
      userName, setUserName,
      firstName, setFirstName,
      isVerified, setIsVerified, 
      ownsProduct, setOwnsProduct,
      libraryItems, setLibraryItems,
      wasCancelled, setWasCancelled,
      productSKU, setProductSKU,
      productResponse, setProductResponse,
       }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
