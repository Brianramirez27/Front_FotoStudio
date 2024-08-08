import React from "react";
import styles from "./navbar.module.css";

import ButtomLogin from "../Buttons/ActiveLogin.jsx";
import logo from "../../assets/logo/LOGOFE.png";


function Navbar() {
    


    return(
        <div className={styles.navbar} >
            <img className={styles.logo}  src={logo} alt="sadsadas" />
            <h1 className={styles.nameWeb}>Foto Studio Estación Digital</h1>
            <ButtomLogin/>
          
        </div>
    )
}

export default Navbar;