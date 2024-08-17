import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./login.module.css";
import { authenticateUser } from "../../services/authenticateService";
import ImgLogin from "../../assets/login/woman-scanning-fingerprint-with-futuristic-interface-smart-technology.jpg";

const Login = () => {
  
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();

  
  const handleSubmit =async (event) => {
    

    try{
        event.preventDefault();
        const result = await authenticateUser(Email, Password);
        if(result.error){
            setError(result.error)
            return
        }
        localStorage.setItem("token", result.token)
        navigate("/admin")
       
    }catch(err){
        setError(err.message)
    }
   
  };

  return (
    <div className={Styles.containerLogin}>
      <div className={Styles.containerImg}>
        <img
          src={ImgLogin}
          alt=""
        />
      </div>

      <form onSubmit={handleSubmit} className={Styles.containerForm}>
        <header className={Styles.headerLogin}>
          <span className={Styles.textLoginOne}>
            Inicia Sesión en tu Cuenta
          </span>
          <span className={Styles.textLogintwo}>
            Para tu seguridad, por favor ingresa tu email de usuario y
            contraseña.
          </span>


        </header>
        {error && <div className={Styles.error}>{error}</div>}
        
        <div className={Styles.containerinputLabel}>
          <div className={Styles.containerFields}>
            <label htmlFor="username">Email</label>
            <input
              className={Styles.fieldInput}
              type="email"
              id="username"
              name="username"
              placeholder="Ingrese su Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={Styles.containerFields}>
            <label htmlFor="password">Password</label>
            <input
              className={Styles.fieldInput}
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su contraseña"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
