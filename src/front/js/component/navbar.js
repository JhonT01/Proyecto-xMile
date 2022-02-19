import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../img/logos/logonavbar.png";
import "../../styles/navbar.css";

const IsLogged = () => {
  return (
    <div
      className="collapse navbar-collapse d-flex-lg align-items-center justify-content-between"
      id="navbarNav"
    >
      <ul className="navbar-nav mt-n1 p-0">
        <li className="nav-item sombreado">
          <Link className="nav-link active pe-auto" to="/principal/1">
            Principal
          </Link>
        </li>
        <li className="nav-item sombreado">
          <Link className="nav-link active pe-auto" to="/client">
            Crear Cliente
          </Link>
        </li>
        <li className="nav-item sombreado">
          <Link
            className="nav-link active pe-auto fontExo"
            to="/subir-archivo/1"
          >
            Cargar Facturas
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav mt-n1 p-0">
        <li className="nav-item">
          <Link to="/">
            <button type="button" className="btn pe-auto">
              Cerrar Sesión
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const IsNotLogged = () => {
  return (
    <div
      className="collapse navbar-collapse d-flex-lg align-items-center justify-content-end"
      id="navbarNav"
    >
      <ul className="navbar-nav mt-n1 p-0">
        <li className="nav-item">
          <Link to="/registro">
            <button type="button" className="btn pe-auto">
              Registrarse
            </button>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/login">
            <button type="button" className="btn pe-auto">
              Iniciar Sesión
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar-fixed navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid p-0 mt-n1 d-flex">
        <Link to="/" className="navbar-brand">
          <a className="navbar-brand" href="/">
            <img
              src={Logo}
              alt="xmile"
              width="95px"
              height="50px"
              className="d-inline-block align-text-top"
            />
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* {store.auth.isAuth ? <IsLogged /> : <IsNotLogged />} */}
        <IsNotLogged />
      </div>
    </nav>
  );
};
