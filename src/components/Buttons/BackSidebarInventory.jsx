import React from "react";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

import backIcon from "../../assets/icons/Back.svg";
import Styles from "./backSidebarInventory.module.css";

const BackSidebarInventory = () => {
    const { setActiveButtomInventory } = useContext(AuthenticationContext);
    
    const handleTobackInnventory = () => {
        setActiveButtomInventory(null);
    }

    return (
        <div className={Styles.containerBackSidebarInventory }>
            <button className={Styles.buttonBack} onClick={handleTobackInnventory}>
                <img className={Styles.imgBack} src={backIcon} alt="" />
            </button>
        </div>
    );
};


export default BackSidebarInventory;