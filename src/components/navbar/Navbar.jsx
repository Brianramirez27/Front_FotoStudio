import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";

import ButtomLogin from "../Buttons/ActiveLogin.jsx";
import {ButtomGoAdmin} from "../Buttons/goAdmin.jsx";
import logo from "../../assets/logo/LOGOFE.png";

import { validateToken } from "../../helpers/TokenHelpers.js";

function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  // despues mostar error con un modal
  const [error, setError] = useState(null);

  useEffect(() => {
    if (validateToken()) {
      try {
        setIsLogged(true);
      } catch (err) {
        setError(err.message);
      }
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="sadsadas" />
      <h1 className={styles.nameWeb}>Foto Studio Estación Digital</h1>
      <span>{error}</span>
      {isLogged ? <ButtomGoAdmin /> : <ButtomLogin />}
    </div>
  );
}

export default Navbar;
