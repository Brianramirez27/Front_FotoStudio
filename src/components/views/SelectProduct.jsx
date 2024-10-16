import React from "react";
import { useContext ,useState} from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import Styles from "./selectProduct.module.css";



const SelectProduct = () => {
  const { selectedProductInventory, setSelectedProductInventory,setActiveButtomInventory, setDeleteProduct} = useContext(
    AuthenticationContext
  );


  const handleDeselectProduct = () => {
    setSelectedProductInventory(null);
  };

  const handleUpdateProduct = () => {
    setActiveButtomInventory("Update Product");
  }


  const handleDeleteProduct = async () => {
    const token = localStorage.getItem("token");

    try{
      const url = `http://localhost:3000/inventory/${selectedProductInventory.product_id}`;
      const result= await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Enviar el token en el header
        }
      })
      const data = await result.json();
      if(result.ok){
        alert("Producto eliminado exitosamente");
        setSelectedProductInventory(null);
        setDeleteProduct(selectedProductInventory);
      }
    }catch(error){
      alert(`Error al eliminar producto: ${error.message}`);
      throw new Error(error)
    }
  }

  return (
    <section className={Styles.sectionSeletedProduct}>
      {selectedProductInventory ? (
        <div className={Styles.containSelectedProduct}>
          <h1 className={Styles.h1} >Producto selecionado</h1>
          <p className={Styles.p}>{selectedProductInventory.product_id}</p>
          <p className={Styles.p}>{selectedProductInventory.category_product_name}</p>
          <p className={Styles.p}>PRECIO:   {selectedProductInventory.product_price}</p>
          <p className={Styles.p}>COSTO:   {selectedProductInventory.product_cost}</p>
          <p className={Styles.p}>CANTIDAD:   {selectedProductInventory.product_amount}</p>
          <img className={Styles.img} src={selectedProductInventory.category_product_url_img}/>
          <button className={Styles.buttonDeselectProduct}
            onClick={() => {
              handleDeselectProduct();
            }}
          >
            x
          </button>
          <button className={Styles.buttonDeleteProduct} onClick={()=>{handleDeleteProduct()}}>Eliminar Product</button>
          <button className={Styles.buttonUpdateProduct} onClick={()=>{handleUpdateProduct()}} >Actualizar Producto</button>
          {

          }
        </div>
      ) : (
        <div>
          <h1 className={Styles.h1noProduct}>
            No hay producto selecionado por favor seleciona uno
          </h1>
        </div>
      )}
    </section>
  );
};

export default SelectProduct;
