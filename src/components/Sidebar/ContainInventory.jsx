import React, { useEffect, useState } from "react";
import Styles from "./containerInventory.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import CreateInventoryForm from "../forms/CreateInventoryForm";

const ContainInventory = () => {
  const { activeButtomInventory, setActiveButtomInventory } = useContext(
    AuthenticationContext
  );

  const [products, setProducts] = useState([]);

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
            Authorization: `Bearer ${token}` // Enviar el token en el header
          }
        });

        const data = await result.json();

        // Asegúrate de guardar solo las categorías del objeto de respuesta
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Error fetching categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={Styles.containInventory}>
      <div className={Styles.containSidebar}>
        {activeButtomInventory === "Actualizar Producto" ? (
          <h1>component actualizar product</h1>
        ) : activeButtomInventory === "Eliminar Producto" ? (
          <h1>formulario de r</h1>
        ) : activeButtomInventory === "Crear Producto" ? (
          <CreateInventoryForm />
        ) : (
          <>
            <button
              className={`${Styles.ButtonSidebar} ${Styles.ButtonUpdate}`}
              onClick={() => {
                setActiveButtomInventory("Actualizar Producto");
              }}
            >
              Actualizar Producto
            </button>
            <button
              className={`${Styles.ButtonSidebar} ${Styles.ButtonDelete}`}
              onClick={() => {
                setActiveButtomInventory("Eliminar Producto");
              }}
            >
              Eliminar Producto
            </button>
            <button
              className={`${Styles.ButtonSidebar} ${Styles.ButtonCreate}`}
              onClick={() => {
                setActiveButtomInventory("Crear Producto");
              }}
            >
              Crear Producto
            </button>
          </>
        )}
      </div>

      <div className={Styles.containTable}>
        <table className={Styles.table}>
          <thead className={Styles.tableHead}>
            <tr className={Styles.tableRow}>
              <th className={Styles.th}>Producto ID</th>
              <th className={Styles.th}>Precio</th>
              <th className={Styles.th}>Costo</th>
              <th className={Styles.th}>Cantidad</th>
              <th className={Styles.th}>Nombre Categoría</th>
              <th className={Styles.th}>Imagen</th>
            </tr>
          </thead>
          <tbody className={Styles.tbody}>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.product_id} className={Styles.tableRow}>
                  <td className={Styles.td}>{product.product_id}</td>
                  <td className={Styles.td}>{product.product_price}</td>
                  <td className={Styles.td}>{product.product_cost}</td>
                  <td className={Styles.td}>{product.product_amount}</td>
                  <td className={Styles.td}>{product.category_product_name}</td>
                  <td className={Styles.td}>
                    <img
                      src={product.category_product_url_img.replace(
                        /['"]/g,
                        ""
                      )}
                      alt={product.category_product_name}
                      className={Styles.img}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={Styles.noProducts}>
                  No hay productos disponibles
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className={Styles.tableFooter}>
            <tr>
              <td colSpan="6">Total Productos: {products.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default ContainInventory;
