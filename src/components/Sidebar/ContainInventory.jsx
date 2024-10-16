import React, { useEffect, useState } from "react";
import Styles from "./containerInventory.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import CreateInventoryForm from "../forms/CreateInventoryForm";
import SelectProduct from "../views/SelectProduct";

import CreateCategoryInventoryForm from "../forms/CreateCategoryInventoryForm";
import UpdateProductInventoryForm from "../forms/UpdateProductInventoryForm";
const ContainInventory = () => {
  const {
    activeButtomInventory,
    setActiveButtomInventory,
    setSelectedProductInventory,
    products,
    setProducts,
    newProduct,
    deleteProduct,
    updateProduct,
    setProductCategorys,
  } = useContext(AuthenticationContext);

   // Cargar las categorías desde el backend
   useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const result = await fetch("http://localhost:3000/inventory/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const data = await result.json();
        if (data.success) {
          setProductCategorys(data.categories);
        } else {
          console.error("Error fetching categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);
useEffect(() => {

  const fetchProducts = async () => {
    try {
      // Recuperar el token del localStorage
      const token = localStorage.getItem("token");

      // Verificar que el token esté disponible
      if (!token) {
        console.error("Token not found");
        return;
      }

      // Hacer la petición con el token en los encabezados
      const result = await fetch("http://localhost:3000/inventory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });

      const data = await result.json();

      // Asegúrate de guardar los productos en el estado
      if (data.success) {
        setProducts(data.products); // Actualiza el estado global/local
        console.log(data.products)
      } else {
        console.error("Error fetching products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



fetchProducts(); // Ejecutar la función al montar el componente
}, [newProduct, deleteProduct, updateProduct]);
 

  const handleSelectProduct = (product) => {
    setSelectedProductInventory(product);
  };

  return (
    <section className={Styles.containInventory}>
      <div className={Styles.containSidebar}>
        <div className={Styles.Tools}>
          {activeButtomInventory === "Crear Categoria" ? (
             <CreateCategoryInventoryForm />
          

          ) : activeButtomInventory === "Crear Producto" ? (
            <CreateInventoryForm />
           
          ) : activeButtomInventory === "Update Product" ? (
            <UpdateProductInventoryForm />
           
          ) : (
            <div className={Styles.containHome}>
              <h1 className={Styles.inventoryTitle}>
                Productos en el inventario
              </h1>
              <button
                className={`${Styles.ButtonSidebar} ${Styles.ButtonUpdate}`}
                onClick={() => {
                  setActiveButtomInventory("Crear Categoria");
                }}
              >
                Crear Categoria
              </button>
              <button
                className={`${Styles.ButtonSidebar} ${Styles.ButtonCreate}`}
                onClick={() => {
                  setActiveButtomInventory("Crear Producto");
                }}
              >
                Crear Producto
              </button>
              <hr className={Styles.hr} />
              <SelectProduct />
          
            </div>
          )}
        </div>
      </div>

      <div className={Styles.containTable}>
        <table className={Styles.table}>
          <tr className={Styles.tableRow}>
            <th className={Styles.th}>Producto ID</th>
            <th className={Styles.th}>Precio</th>
            <th className={Styles.th}>Costo</th>
            <th className={Styles.th}>Cantidad</th>
            <th className={Styles.th}>Nombre Categoría</th>
            <th className={Styles.th}>Imagen</th>
          </tr>

          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.product_id}
                className={Styles.tableRow}
                onClick={() => {
                  handleSelectProduct(product);
                }}
              >
                <td className={Styles.td}>{product.product_id}</td>
                <td className={Styles.td}>{product.pructo_price}</td>
                <td className={Styles.td}>{product.product_cost}</td>
                <td className={Styles.td}>{product.product_amount}</td>
                <td className={Styles.td}>{product.category_product_name}</td>
                <td className={Styles.td}>
                  <img
                    src={product.category_product_Url_img}
                    alt={product.category_product_name}
                    className={Styles.img}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr className={Styles.tableRow}>
              <td colSpan="6" className={Styles.noProducts}>
                No hay productos disponibles
              </td>
            </tr>
          )}

          <tr className={Styles.tableRow}>
            <td colSpan="6">Total Productos: {products.length}</td>
          </tr>
        </table>
      </div>
    </section>
  );
};

export default ContainInventory;
