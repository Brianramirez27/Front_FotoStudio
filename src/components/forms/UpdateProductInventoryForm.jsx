import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import BackSidebarInventory from "../Buttons/BackSidebarInventory";

import Styles from "./updateProductInventoryForm.module.css";
const UpdateProductInventoryForm = () => {
  const { selectedProductInventory,updateProduct,setSelectedProductInventory,setActiveButtomInventory, setUpdateProduct, productCategorys } =
    useContext(AuthenticationContext);



  const [productCost, setProductCost] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const [fkProductCategory, setFkProductCategory] = useState(""); // Almacenar el ID de la categoría
  const [productCategoryName, setProductCategoryName] = useState(""); // Almacenar el nombre de la categoría
  

  useEffect(() => {
    if (selectedProductInventory && selectedProductInventory.product_id) {
      setProductAmount(selectedProductInventory.product_amount);
      setProductCost(selectedProductInventory.product_cost);
      setProductPrice(selectedProductInventory.pructo_price);
      setProductCategoryName(selectedProductInventory.category_product_name);
   
      const selectedCategory = productCategorys.find(
        (category) => category.category_product_name == selectedProductInventory.category_product_name
      );
      if (selectedCategory) {
        setFkProductCategory(selectedCategory.category_product_id); // Guardar el ID de la categoría
      }
     
    }
  }, [selectedProductInventory]);


  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "product_amount":
        setProductAmount(value);
        break;
      case "product_cost":
        setProductCost(value);
        break;
      case "procduct_price":
        setProductPrice(value);
        break;
      case "category_product_name": // Cambiar el nombre del select a "category_product_name"
        setProductCategoryName(value);
        const selectedCategory = productCategorys.find(
          (category) => category.category_product_name === value
        );
        if (selectedCategory) {
          setFkProductCategory(selectedCategory.category_product_id); // Guardar el ID de la categoría
        }
        break;
      default:
        break;
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const data = {
        product_amount: productAmount,
        product_cost: productCost,
        product_price: productPrice,
        fk_product_category_product: fkProductCategory // Enviar el ID de la categoría
      };

      const result = await fetch(
        `https://backfotostudio-development.up.railway.app/sales/6c739143-1aa5-4fc4-946f-99fb35814c0f/inventory/${selectedProductInventory.product_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      );

      if (result.ok) {
        alert("Producto actualizado exitosamente", result.productUpdate);
        setUpdateProduct(!updateProduct);
        setActiveButtomInventory(null)
        setSelectedProductInventory(null);

      } else {
        alert(`Error al actualizar producto: ${data.message}`);
      }
    } catch (error) {
      alert(`Error en la solicitud: ${error.message}`);
    }
  };

  return (
    <div className={Styles.containerUpdateProduct}>
      <BackSidebarInventory />
      <h2 className={Styles.h2}>Actualizar Producto</h2>
      <span className={Styles.span}>{selectedProductInventory.product_id}</span>
      <form className={Styles.form} onSubmit={handleSubmit}>
        <label className={Styles.label} htmlFor="product_amount">
          Cantidad
        </label>
        <input
          className={Styles.input}
          type="number"
          name="product_amount"
          id="product_amount"
          value={productAmount}
          onChange={handleChange}
        />

        <label className={Styles.label} htmlFor="product_cost">
          Costo
        </label>
        <input
          className={Styles.input}
          type="number"
          name="product_cost"
          id="product_cost"
          value={productCost}
          onChange={handleChange}
        />

        <label className={Styles.label} htmlFor="product_price">
          Precio
        </label>
        <input
          className={Styles.input}
          type="number"
          name="product_price"
          id="product_price"
          value={productPrice}
          onChange={handleChange}
        />

        <label className={Styles.label} htmlFor="fk_product_category_product">
          Categoría del Producto
        </label>
        <select
          className={Styles.select}
          name="category_product_name"
          id="category_product_name"
          value={productCategoryName} // Mostrar el nombre de la categoría seleccionada
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecciona la categoría
          </option>
          {productCategorys.map((category) => (
            <option
              key={category.category_product_id}
              value={category.category_product_name} // El value es el nombre de la categoría
            >
              {category.category_product_name}
            </option>
          ))}
        </select>

        <button className={Styles.button} type="submit">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default UpdateProductInventoryForm;
