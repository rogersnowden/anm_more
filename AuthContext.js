import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [firstname, setFirstName] = useState(null);
  const [ownsProduct, setOwnsProduct] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, firstname, setFirstName,
      ownsProduct, setOwnsProduct }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
