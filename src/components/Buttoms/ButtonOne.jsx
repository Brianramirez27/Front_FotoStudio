import React from "react";
import styles from "./buttonOne.module.css";

function ButtonOne() {
    return(
        <div className={styles.containerButton}>
            <button className={styles.buttonOne}>Login Admin</button>
        </div>
    )
}

export default ButtonOne;