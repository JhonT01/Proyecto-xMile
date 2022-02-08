import React, { useState } from "react";
import {Link} from 'react-router-dom'
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

export const Login = () => {
  
  
  //State para iniciar Sesion
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });


  //extraer de usuario
  const { email, password } = usuario;

  const onChange = e => {
    guardarUsuario({
      ...usuario, //crea una copa de usuario
      [e.target.name]: e.target.value //reescribe la actual
    });
  };

  const handleSubmission = () => {
    const formData = usuario;
    let obj = {};
    obj["email"] = usuario.email;


    if([guardarUsuario].includes('')){
      console.log("Vacio")
    }else{
      console.log('Full')
    }




    fetch(
      "https://3001-jhont01-proyectoxmile-8qyohhug9r5.ws-us30.gitpod.io/login",
      {
        method: "POST",
        body: JSON.stringify(obj),
      }
    );
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log("Success:", result);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    console.log(obj);
  };

  return (
    <div className="form-usuario">
      <div className=" contenedor-form text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1>Iniciar Sesión</h1>

        <form className="px-4 py-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Usuario Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="TuEmail@email.com"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="dropdownCheck"
              />
              <label className="form-check-label" htmlFor="dropdownCheck">
                Recordar
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-outline-info"
            onClick={handleSubmission}
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="dropdown-divider"></div>
        <Link to={'/registro'} className="dropdown-item" >
          Registrarse
        </Link>
        <a className="dropdown-item" href="#">
          ¿Olvido su contraseña?
        </a>
      </div>
    </div>
  );
};

export default Login;
