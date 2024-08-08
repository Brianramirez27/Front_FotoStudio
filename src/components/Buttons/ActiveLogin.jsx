import React from "react";
import styles from "./activeLogin.module.css";
import { AuthenticationContext } from "../../context/AuthenticationContext";
import { useContext } from "react";

function ActiveLogin() {
    //     // sacar del use context si existe sesion o de las cokies para iniciar el estado de log const} = useContext(AuthenticationContext);
    const { activeSingIn,setActiveSingIn} = useContext(AuthenticationContext);
    

    function handleClick(){
        setActiveSingIn(!activeSingIn);
        
    }

    return(
        <div className={styles.containerButton}>
            <button className={`${styles.button} ${activeSingIn ? styles.buttonActive :""}`} onClick={handleClick}>Iniciar Sessión</button>
        </div>
    )
}

export default  ActiveLogin;