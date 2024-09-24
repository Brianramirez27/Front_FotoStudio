import { createContext, useState } from "react";

// Crear el contexto global
const AuthenticationContext = createContext();

// Crear el proveedor del contexto
const AuthenticationProvider = ({ children }) => {

  // estados de la autenticación
  const [activeSingIn, setActiveSingIn] = useState(false);
  const [activeSection, setActiveSection] = useState('ventas');
  

  // estados del inventario
  const [selectedProductInventory, setSelectedProductInventory] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [activeButtomInventory, setActiveButtomInventory] = useState(null);

  return (
    <AuthenticationContext.Provider
      value={{
        activeSingIn,
        setActiveSingIn,
        activeSection,      
        setActiveSection,
        activeButtomInventory,
        setActiveButtomInventory ,
        selectedProductInventory,
        setSelectedProductInventory,
        products,
        setProducts,
        newProduct,
        setNewProduct,
        updateProduct,
        setUpdateProduct,
        deleteProduct,
        setDeleteProduct,
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
