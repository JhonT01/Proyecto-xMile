import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../img/Logo-con-nombre.png";
import "../../styles/navbar.css";

const IsLogged = () => {
  return (
    <>
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
        <Link className="nav-link active pe-auto" to="/subir-archivo/1">
          Cargar Facturas
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/"> 
          <button
            type="button"
            className="btn pe-auto position-absolute end-0 pr-2"
          >
            Cerrar Sesión
          </button>
          
        </Link>

      </li>
    </>
  );
};

const IsNotLogged = () => {
  return (
    <>
      <li className="nav-item  position-absolute end-0 pr-2">
        <Link to="/registro">
          <button type="button" className="btn pe-auto">
            Registrarse
          </button>
        </Link>
        <Link to="/login">         
          <button type="button" className="btn pe-auto">
            Iniciar Sesión
          </button>
        </Link>
      </li>
    </>
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
              width="50"
              height="50"
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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mt-n1 p-0">
            {store.auth.isAuth ? <IsLogged /> : <IsNotLogged />}
          </ul>
        </div>
      </div>
    </nav>
  );
};
