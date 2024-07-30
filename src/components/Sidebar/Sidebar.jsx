import React from "react";

import Styles from "./sidebar.module.css";
import IconCamera from "../../assets/icons/camera.svg";
import IconSales from "../../assets/icons/ventas.svg"
import IconInventory from "../../assets/icons/box.svg";
import IconDashboard from "../../assets/icons/chart-pie-solid.svg";

function Sidebar() {
  return (
    <div className={Styles.containerSidebar}>
      <div className={Styles.LogoAdmin}>
        <img className={Styles.Logo} src={IconCamera} alt="" />
        <p className={Styles.nameLogo}>Foto Studio</p>
      </div>

      <section className={Styles.containerTools}>
          <p className={Styles.categoryTools}>Herramientas</p>
          <div className={Styles.Tool}>
            <img className={Styles.iconsTools} src={IconSales} alt="" />
            <p  className={Styles.textTools}>Ventas</p>
          </div>
          <div className={Styles.Tool}>
            <img className={Styles.iconsTools}src={IconInventory} alt="" />
            <p  className={Styles.textTools}>Inventario</p>
          </div>
          <div className={Styles.Tool}>
            <img className={Styles.iconsTools}src={IconDashboard} alt="" />
            <p className={Styles.textTools}>Dashboard</p>
          </div>
          <p className={Styles.categoryTools}>Redes Sociales</p>
        
      </section>
    </div>
  );
}

export default Sidebar;
