import React from "react";
import Styles from "./containerInventory.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import CreateInventoryForm from "../forms/CreateInventoryForm";

const ContainInventory = () => {
  const { activeButtomInventory, setActiveButtomInventory } = useContext(
    AuthenticationContext
  );

  return (
    <section className={Styles.containInventory}>
            <div className={Styles.containSidebar}>
      {
        activeButtomInventory === "Actualizar Producto" ? (
         <h1>component actualizar product</h1>
        ) : activeButtomInventory === "Eliminar Producto" ? (
          <h1>formulario de r</h1>
        ) : activeButtomInventory === "Crear Producto" ? (
            <CreateInventoryForm />
          ): (
        <>
            <button className={`${Styles.ButtonSidebar} ${Styles.ButtonUpdate}`} onClick={()=>{setActiveButtomInventory("Actualizar Producto")}} >
              Actualizar Producto
            </button>
            <button className={`${Styles.ButtonSidebar} ${Styles.ButtonDelete}`} onClick={()=>{setActiveButtomInventory("Eliminar Producto")}}>
              Eliminar Producto
            </button>
            <button className={`${Styles.ButtonSidebar} ${Styles.ButtonCreate}`} onClick={()=>{setActiveButtomInventory("Crear Producto")}}>
              Crear Producto
            </button>
        </>
         
    
        ) 
      }
       </div>
     
      <div className={Styles.containTable}>
        <table>
          <ul>4</ul>
          <ul>3</ul>
          <ul>2</ul>
          <ul>fdf</ul>
        </table>
      </div>
    </section>
  );
};

export default ContainInventory;
