import React,{useContext} from "react";
import Navbar from "../components/navbar/Navbar.jsx";
import styles from "./home.module.css";
import { AuthenticationContext } from "../context/AuthenticationContext";
import Login from "../components/login/Login.jsx";

function Home() {
  const { activeSingIn} = useContext(AuthenticationContext);
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
        {!activeSingIn ? (
          <section className={styles.homeRight}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </section>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
}

export default Home;
