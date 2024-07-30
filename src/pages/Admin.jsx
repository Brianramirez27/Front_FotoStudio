import React from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import NavbarAdmin from "../components/navbar/NavbarAdmin";
import Styles from "./admin.module.css";

function Admin( ){


    return(
        <div className={Styles.containerAdmin}>
            <Sidebar/>
            <div className={Styles.adminResource}>
                <NavbarAdmin/>
                <p>contenido de admin </p>
            </div>
        </div>
    )
}

export default Admin;