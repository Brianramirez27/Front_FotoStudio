import React from "react";
import styles from "./navbar.module.css";

import ButtomOne from "../Buttoms/ButtonOne.jsx";
import logo from "../../assets/logo/LOGOFE.png";


function Navbar() {
    return(
        <div className={styles.navbar} >
            <img className={styles.logo}  src={logo} alt="sadsadas" />
            <h1 className={styles.nameWeb}>Foto Studio Estación Digital</h1>
            <ButtomOne/>
          
        </div>
    )
}

export default Navbar;