import React from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import logo from "../assets/logo/LOGOFE.png";
import styles from "./home.module.css";

function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.containerHome}>
        <section className={styles.homeLeft}>
          <p className={styles.bienvenido}>
            <span className={styles.bienvenidOTwo}>¡Bienvenido a</span> Foto
            Studio Estación Digital!
          </p>
          <p className={styles.homeLeft_p_one}>
            Gestiona, registra y analiza toda la información de tu tienda de
            fotografía con facilidad y eficiencia.
          </p>
         
        </section>
        <section className={styles.homeRight}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </div>
    </>
  );
}

export default Home;
