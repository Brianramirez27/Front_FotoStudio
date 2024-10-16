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
  const [updateProduct, setUpdateProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [activeButtomInventory, setActiveButtomInventory] = useState(null);
  const [productCategorys, setProductCategorys] = useState([]);


  //estados de las ventas
  const [selectedSale, setSelectedSale] = useState(null);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState(null);
  const [updateSale, setUpdateSale] = useState(false);
  const [deleteSale, setDeleteSale] = useState(null);

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
        productCategorys,
        setProductCategorys,
        sales,
        setSales,
        newSale,
        setNewSale,
        updateSale,
        setUpdateSale,
        deleteSale,
        setDeleteSale,
        selectedSale,
        setSelectedSale,

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
