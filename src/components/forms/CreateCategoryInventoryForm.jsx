import React, { useState } from "react";

import BackSidebarInventory from "../Buttons/BackSidebarInventory";

import Styles from "./createCategoryInventoryForm.module.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";


const CreateCategoryInventoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const { setActiveButtomInventory } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const token = localStorage.getItem("token"); // Recuperar el token del localStorage
    try {
      const result = await fetch("http://localhost:3000/inventory/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          category_product_name: categoryName,
          category_product_url_img: categoryImage
        })
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data);
        alert("Categoria creada con éxito");
        // Aquí puedes limpiar los campos si lo deseas
        setCategoryName("");
        setCategoryImage("");
        setActiveButtomInventory(null);

      } else {
        alert("Error al crear la categoría");
      }
    } catch (error) {
      alert("Error al crear la categoría", error);
    }
  };

  return (
    <div className={Styles.containerCategory}>
      <BackSidebarInventory />
      <h2 className={Styles.h2}>Crear Categoria</h2>
      <div className={Styles.containerCreateCategoryInventoryForm}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <label className={Styles.label}>Nombre de la Categoria</label>
          <input
            className={Styles.input}
            type="text"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <label className={Styles.label}>Url de la imagen</label>
          <input
            className={Styles.input}
            type="text"
            name="categoryImage"
            value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.value)}
            required
          />
          <button className={Styles.button} type="submit">
            Crear Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryInventoryForm;
