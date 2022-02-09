import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo-con-nombre.png";
import "../../styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar-fixed navbar-expand-lg navbar-light bg-white pe-none">
      <div className="container-fluid p-0 mt-n1 d-flex">
        <a className="navbar-brand" href="#">
          <Link to="/">
            <img
              src={Logo}
              alt="xmile"
              width="80"
              height="50"
              className="d-inline-block align-text-top"
            />
          </Link>
        </a>
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
            <li className="nav-item sombreado">
              <a
                className="nav-link active pe-auto"
                aria-current="page"
                href="#"
              >
                Profile
              </a>
            </li>
            <li className="nav-item sombreado">
              <a className="nav-link active pe-auto" href="/principal/1">
                Clientes
              </a>
            </li>
            <li className="nav-item sombreado">
              <a className="nav-link active pe-auto" href="#">
                Crear Cliente
              </a>
            </li>
            <li className="nav-item sombreado">
              <Link className="nav-link active pe-auto" to="/subir-archivo">
                Cargar Facturas
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn pe-auto position-absolute end-0 pr-2"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
