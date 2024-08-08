import { createContext, useState } from "react";

// Crear el contexto global
const AuthenticationContext = createContext();

// Crear el proveedor del contexto
const AuthenticationProvider = ({ children }) => {
  const [activeSingIn, setActiveSingIn] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        activeSingIn,
        setActiveSingIn
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { 
    AuthenticationContext,
     AuthenticationProvider
     };
