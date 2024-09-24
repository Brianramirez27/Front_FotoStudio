import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import BackSidebarInventory from "../Buttons/BackSidebarInventory";

import Styles from "./updateProductInventoryForm.module.css";
const UpdateProductInventoryForm = () => {

    const { selectedProductInventory,setUpdateProduct } = useContext(AuthenticationContext);

  const [productCost, setProductCost] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const [fkProductCategory, setFkProductCategory] = useState(""); // Almacenar el ID de la categoría
  const [productCategoryName, setProductCategoryName] = useState(""); // Almacenar el nombre de la categoría

  const [productCategorys, setProductCategorys] = useState([]);
  console.log(productCategorys);


  useEffect(() => {
    if (selectedProductInventory && selectedProductInventory.product_id) {
      setProductAmount(selectedProductInventory.product_amount);
      setProductCost(selectedProductInventory.product_cost);
      setProductPrice(selectedProductInventory.product_price);
      setProductCategoryName(selectedProductInventory.category_product_name);
      setFkProductCategory(selectedProductInventory.fk_product_category_product); // Guardar el ID de la categoría si existe
    }
  }, [selectedProductInventory]);

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
            Authorization: `Bearer ${token}`,
          },
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
      case "product_price":
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

    try{
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token not found");
            return;
        }

        const data = {
            product_amount: productAmount,
            product_cost: productCost,
            product_price: productPrice,
            fk_product_category_product: fkProductCategory, // Enviar el ID de la categoría
          };
          console.log(data);

          const result = await fetch(`http://localhost:3000/inventory/${selectedProductInventory.product_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data), 
            });

            if (result.ok) {
                alert("Producto actualizado exitosamente",result.productUpdate);
                setUpdateProduct(data.productUpdate);
              } else {

                alert(`Error al actualizar producto: ${data.message}`);
              }
            }catch(error){
                alert(`Error en la solicitud: ${error.message}`);
            }
  };

  return (
    <div className={Styles.containerUpdateProduct}>
      <BackSidebarInventory />
      <h2 className={Styles.h2}>Actualizar Producto</h2>
      <span className={Styles.span} >{selectedProductInventory.product_id}</span>
      <form className={Styles.form} onSubmit={handleSubmit}>

        <label  className={Styles.label} htmlFor="product_amount">Cantidad</label>
        <input
        className={Styles.input}
          type="number"
          name="product_amount"
          id="product_amount"
          value={productAmount}
          onChange={handleChange}
        />

        <label  className={Styles.label} htmlFor="product_cost">Costo</label>
        <input
        className={Styles.input}
          type="number"
          name="product_cost"
          id="product_cost"
          value={productCost}
          onChange={handleChange}
        />

        <label className={Styles.label} htmlFor="product_price">Precio</label>
        <input
        className={Styles.input}
          type="number"
          name="product_price"
          id="product_price"
          value={productPrice}
          onChange={handleChange}
        />

        <label className={Styles.label} htmlFor="fk_product_category_product">Categoría del Producto</label>
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

        <button className={Styles.button} type="submit">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default UpdateProductInventoryForm;
