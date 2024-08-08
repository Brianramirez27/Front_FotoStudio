import React from "react";
import Styles from "./navbarAdmin.module.css";
import IconExit from "../../assets/icons/salir.svg";
import IconUser from "../../assets/icons/user.svg";


function NavbarAdmin() {
    return(
        <div className={Styles.containerNavbarAdmin}>
            {/* <p className={Styles.bienvenidoAdmin}>Bienvenid admin juan</p> */}
            <div className={Styles.containerNavbarImg}>
                <img className={Styles.imgUser} src={IconUser} alt="img user"></img>
                <button className={Styles.btnExit}>
                    <img className={Styles.imgExit} src={IconExit}/>
                </button>

                <bottom></bottom>
                
            </div>
        </div>
    )
}

export default NavbarAdmin;