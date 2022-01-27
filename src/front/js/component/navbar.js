import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo-con-nombre.png";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-white pe-none">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img
            src={Logo}
            alt="xmile"
            width="80"
            height="50"
            class="d-inline-block align-text-top"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link active pe-auto text-info"
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active pe-auto" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active pe-auto" href="#">
                Pricing
              </a>
            </li>
            <li class="nav-item">
              <button
                type="button"
                class="btn btn-success pe-auto position-absolute end-0 pr-2"
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
