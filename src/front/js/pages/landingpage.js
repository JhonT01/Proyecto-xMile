import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.css";
import foto_kevin from "../../img/team/kevin.jpeg";
import foto_jhon from "../../img/team/jhon.jpg";
import foto_luis from "../../img/team/luis.jpeg";
import foto_facundo from "../../img/team/facundo.jpg";
import foto_jesús from "../../img/team/jesús.jpg";
import imagotipo from "../../img/logos/imagotipo.png";

export const Landing_page = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      {/* <!--     HERO CONTAINER     --> */}
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1">
              Agiliza tus reportes de facturación con...
            </h1>
            <p className="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the worlds most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            {/* <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              >
                Primary
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Default
              </button>
            </div> */}
          </div>
          {/*          <div className="col-lg-7 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src={imagotipo} alt="" width="600" />
          </div>*/}
          <div className="col-1">
            <img src={imagotipo} alt="" width="500" />
          </div>
        </div>
      </div>
      {/* <!--     /HERO CONTAINER     --> */}

      <div className="b-example-divider"></div>

      {/* <!--     FEATURE 1     --> */}

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom">Objetivos y funciones</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </div>
            <h2>Importa archivos XML</h2>
            <p>Procesa tus facturas electrónicas en formato XML.</p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </div>
            <h2>Genera reportes</h2>
            <p>
              Realiza un análisis detallado sobre tus transacciones en formato Excel, PowerBi, o incluso ERPs.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a>
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary bg-gradient">
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </div>
            <h2>Seguridad fiscal</h2>
            <p>
              Gracias a la encriptación de la base de datos en SQL, tus datos están protegidos bajo garantía de tu cuenta.
            </p>
            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* <!--    /FEATURE 1     --> */}

      <div className="b-example-divider"></div>

      {/* <!--     FEATURE 2     --> */}

      <div
        className="container d-flex align-items-center px-4 py-5"
        id="custom-cards"
      >
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />

        <div className="container">
          {/* <!-- Tittle --> */}
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light">Nuestro equipo</h2>
              <p className="font-italic text-muted">Compuesto por los más intrépidos aventureros.</p>
            </div>
          </div>
          {/* <!-- Tittle--> */}

          <div className="row text-center align-items-center">
            {/* <!-- Team item--> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_jesús}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Jesús León</h5>
                <span className="small text-uppercase text-muted">
                  Colaborador
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/jesus-leon-abb044b8/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/leonjesusC"
                      className="social-link"
                    >
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End--> */}

            {/* <!-- Team item--> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_jhon}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Jhon Téllez</h5>
                <span className="small text-uppercase text-muted">
                  Colaborador
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/jhon-fernando-tellez-camargo-2675a7220/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/JhonT01"
                      className="social-link"
                    >
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End--> */}

            {/* <!-- Team item--> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_kevin}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Kevin Bullor</h5>
                <span className="small text-uppercase text-muted">
                  Colaborador
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/kevin-bullor-08b01576/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/kevinmillo"
                      className="social-link"
                    >
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End--> */}

            {/* <!-- Team item--> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_luis}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Luis Alberto</h5>
                <span className="small text-uppercase text-muted">
                  Colaborador
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/luismadridf/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/DevOpsLuixus"
                      className="social-link"
                    >
                      <i className="fa fa-github"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- End--> */}

            {/* <!-- Team item--> */}
            <span className="team5">
              <div className="col-xl-3 col-sm-6 mb-5">
                <div className="bg-white rounded shadow-sm py-5 px-4">
                  <img
                    src={foto_facundo}
                    alt=""
                    width="100"
                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                  />
                  <h5 className="mb-0">Facundo Gul</h5>
                  <span className="small text-uppercase text-muted">
                    Colaborador
                  </span>
                  <ul className="social mb-0 list-inline mt-3">
                    <li className="list-inline-item">
                      <a
                        href="https://www.linkedin.com/in/facundoguldossantos/"
                        className="social-link"
                      >
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li className="list-inline-item">
                      <a
                        href="https://github.com/FacundoGdS"
                        className="social-link"
                      >
                        <i className="fa fa-github"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </span>

            {/* <!-- End--> */}
          </div>
        </div>
      </div>

      {/* <!--    /FEATURE 2     --> */}
    </div>
  );
};
