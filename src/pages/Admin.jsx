import React from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import Styles from "./admin.module.css";

import ContainInventory from "../components/Sidebar/ContainInventory";

import { useContext } from "react";

import { AuthenticationContext } from "../context/AuthenticationContext";

function Admin( ){
    
    const { activeSection,} = useContext(AuthenticationContext);

    return(
        <div className={Styles.containerAdmin}>
            <Sidebar/>
            <div className={Styles.adminResource}>
                <NavbarAdmin/>
                {
                    activeSection === 'ventas' ? <h1>ventas</h1> : activeSection === 'inventario' ?  <ContainInventory/> : <h1>Dashboard</h1>
                }
               
            </div>
        </div>
    )
}

export default Admin;