import React from "react";
import Styles from "./navbarAdmin.module.css";
import IconExit from "../../assets/icons/salir.svg";
import IconUser from "../../assets/icons/user.svg";
import { useNavigate } from "react-router-dom";

function NavbarAdmin() {
    const navigate = useNavigate();
  const handleExit = () => {

    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={Styles.containerNavbarAdmin}>
      {/* <p className={Styles.bienvenidoAdmin}>Bienvenid admin juan</p> */}
      <div className={Styles.containerNavbarImg}>
        <img className={Styles.imgUser} src={IconUser} alt="img user"></img>
        <button className={Styles.btnExit} onClick={handleExit}>
          <img className={Styles.imgExit} src={IconExit} />
        </button>
      </div>
    </div>
  );
}

export default NavbarAdmin;
