import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { BASE_URL } from "../store/flux";

import { ToastySuccess } from "../component/toastySuccess";
import { ToastyFail } from "../component/toastyFail";

export const Login = () => {
  //State para iniciar Sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  //validacion de campos
  const [error, setError] = useState(false);
  const { store, actions } = useContext(Context);

  // routing a pagina en caso de login exitoso
  let history = useHistory();

  //extraer de usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario, //crea una copa de usuario
      [e.target.name]: e.target.value, //reescribe la actual
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    let element1 = document.getElementById("toastySuccess");
    let myToastSuccess = new bootstrap.Toast(element1);

    let element2 = document.getElementById("toastyFail");
    let myToastFail = new bootstrap.Toast(element2);

    const obj = {
      email: usuario.email,
      password: usuario.password,
    };

    if (usuario.email == "" || usuario.password == "") {
      setError(true);
      return;
    } else {
      setError(false);
    }
    try {
      const response = await fetch(BASE_URL + "/api/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      sessionStorage.setItem("access_token", data.access_token);
      actions.authHandle(data.access_token, true);
      myToastSuccess.show();
      history.push("/principal/1");
    } catch (error) {
      myToastFail.show();
    }
  };

  return (
    <div className="form-usuario">
      <div className=" contenedor-form text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1 className="fontExo">Iniciar Sesión</h1>

        <form className="px-4 py-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fontExo">
              Usuario Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fontExo">
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
              <label className="form-check-label fontExo" htmlFor="dropdownCheck">
                Recordar
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline-info fontExo"
            onClick={handleSubmission}
          >
            Iniciar Sesión
          </button>

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show rounded mt-3"
              role="alert"
            >
              <p className="fontExo">Todos los campos son obligatorios</p>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
          <div className="dropdown-divider"></div>
        </form>

        <Link to={"/registro"} className="dropdown-item fontExo">
          ¿No tienes una cuenta?{" "}
          <span className="linkRegistro fontExo">Registrate</span>
        </Link>
        <a className="dropdown-item fontExo" href="#">
          ¿Olvidó su contraseña?
        </a>
      </div>
      <ToastySuccess mensaje="Login Exitoso"></ToastySuccess>
      <ToastyFail mensaje="Login fail"></ToastyFail>
    </div>
  );
};

export default Login;
