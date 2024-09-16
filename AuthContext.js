import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [baseURL] = useState(window.location.origin);
  const [APIURL] = useState('https://localhost:4000/');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [micLevel, setMicLevel] = useState(50); // def mic level
  const [ownsProduct, setOwnsProduct] = useState(false);
  const [libraryItems, setLibraryItems] = useState();
  const [wasCancelled, setWasCancelled] = useState(false);
  const [productSKU, setProductSKU] = useState();
  const [userBook, setUserBook] = useState();
  const [userBookPageCount, setUserBookPageCount] = useState();
  const [productResponse, setProductResponse] = useState();

  console.log("AuthProvider isLoggedIn: ", isLoggedIn);
  console.log("AuthProvider userBook: ", userBook);

  return (
    <AuthContext.Provider value={{ 
      baseURL,
      APIURL,
      isLoggedIn, setIsLoggedIn, 
      userName, setUserName,
      firstName, setFirstName,
      isVerified, setIsVerified,
      micLevel, setMicLevel,
      ownsProduct, setOwnsProduct,
      libraryItems, setLibraryItems,
      wasCancelled, setWasCancelled,
      productSKU, setProductSKU,
      userBook, setUserBook,
      userBookPageCount, setUserBookPageCount,
      productResponse, setProductResponse,
       }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
