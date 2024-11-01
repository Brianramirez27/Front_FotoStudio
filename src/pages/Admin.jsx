import React from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import Styles from "./admin.module.css";

import ContainInventory from "../components/Sidebar/ContainInventory";
import ContainerVentas from "../components/Sidebar/containerVentas";
import ContainerDash from "../components/Sidebar/containerDash";

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
                    activeSection === 'ventas' ? <ContainerVentas /> : activeSection === 'inventario' ?  <ContainInventory/> : <ContainerDash/>
                }
               
            </div>
        </div>
    )
}

export default Admin;