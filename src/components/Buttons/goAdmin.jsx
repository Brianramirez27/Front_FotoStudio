import React from "react";

import { useNavigate } from "react-router-dom";

import styles from "./goAdmin.module.css";
const ButtomGoAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.containerButton}>
      <button
        className={styles.button}
        onClick={() => {
          navigate("/admin");
        }}
      >
        Panel de Administrador
      </button>
    </div>
  );
};

export { ButtomGoAdmin };
