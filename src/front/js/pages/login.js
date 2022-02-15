import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Login = () => {
  //State para iniciar Sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  //validacion de campos
  const [error, setError] = useState(false);
  const { store, actions } = useContext(Context);

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

    const response = await fetch(
      "https://3001-jhont01-proyectoxmile-8qyohhug9r5.ws-us31.gitpod.io/api/login",
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(obj),
      }
    );
    const data = await response.json();
    sessionStorage.setItem("access_token", data.access_token);
    actions.authHandle(data.access_token, true);
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
              placeholder="Correo electrónico"
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

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show rounded mt-3"
              role="alert"
            >
              <p>Todos los campos son obligatorios</p>
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

        <Link to={"/registro"} className="dropdown-item">
          ¿No tienes una cuenta?{" "}
          <span className="linkRegistro">Registrate</span>
        </Link>
        <a className="dropdown-item" href="#">
          ¿Olvido su contraseña?
        </a>
      </div>
    </div>
  );
};

export default Login;
