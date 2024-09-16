import { createContext, useState } from "react";

// Crear el contexto global
const AuthenticationContext = createContext();

// Crear el proveedor del contexto
const AuthenticationProvider = ({ children }) => {

  const [activeSingIn, setActiveSingIn] = useState(false);
  const [activeSection, setActiveSection] = useState('ventas');
  const [activeButtomInventory, setActiveButtomInventory] = useState(null);

  return (
    <AuthenticationContext.Provider
      value={{
        activeSingIn,
        setActiveSingIn,
        activeSection,      
        setActiveSection,
        activeButtomInventory,
        setActiveButtomInventory 
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
