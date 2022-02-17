import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.css";
import foto_kevin from "../../img/team/kevin.jpeg";
import foto_jhon from "../../img/team/jhon.jpg";
import foto_luis from "../../img/team/luis.jpeg";
import foto_facundo from "../../img/team/facundo.jpg";
import foto_jesús from "../../img/team/jesús.jpg";
import imagotipo from "../../img/logos/imagotipo_blanco.png";

export const Landing_page = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
      />

      {/* <!--     HERO CONTAINER     --> */}

      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center justify-content-center rounded-3 border shadow-lg">
          <div className="col-lg-6 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 fontExo">
              Agiliza tus reportes de facturación con...
            </h1>
            <p className="lead">
              Toda la información previsiblemente fiscal al alcance de tus
              dedos. ¡Extracción confiable y certera en un abrir y cerrar de
              ojos!
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
          <div
            id="div-img-hero"
            className="col-lg-5 col-sm-8 col-md-8 shadow-lg mb-5 align-items-center"
          >
            <img
              id="img-hero"
              src={imagotipo}
              max-width="100%"
              max-height="100%"
              loading="lazy"
            />
          </div>
          {/* <div className="col-10 col-sm-8 col-lg-6 shadow-lg rounded-lg-5"> */}
          {/* <img
            className="col-10 col-sm-1 col-lg-5 shadow-lg rounded-lg-5"
            id="hero-image"
            src={imagotipo}
            width="510"
            height="510"
            loading="lazy"
          /> */}
          {/* </div> */}
        </div>
      </div>
      {/* <!--     /HERO CONTAINER     --> */}

      <div className="b-example-divider"></div>

      {/* <!--     FEATURE 1     --> */}

      <div className="container px-4 py-5" id="featured-3">
        <h2 className="pb-2 border-bottom fontExo">Objetivos y funciones</h2>
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="feature col">
            <div className="feature-icon bg-primary maincolor bg-gradient">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-filetype-xml"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 4.5V14a2 2 0 0 1-2 2v-1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM3.527 11.85h-.893l-.823 1.439h-.036L.943 11.85H.012l1.227 1.983L0 15.85h.861l.853-1.415h.035l.85 1.415h.908l-1.254-1.992 1.274-2.007Zm.954 3.999v-2.66h.038l.952 2.159h.516l.946-2.16h.038v2.661h.715V11.85h-.8l-1.14 2.596h-.025L4.58 11.85h-.806v3.999h.706Zm4.71-.674h1.696v.674H8.4V11.85h.791v3.325Z"
                />
              </svg>
            </div>
            <h2 className="fontExo">Importa archivos XML</h2>
            <p className="fontExo">
              Procesa tus facturas electrónicas en formato XML.
            </p>
            {/*            <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a>*/}
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary maincolor bg-gradient">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-flag-fill"
                viewBox="0 0 16 16"
              >
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
              </svg>
            </div>
            <h2 className="fontExo">Genera reportes</h2>
            <p className="fontExo">
              Realiza un análisis detallado sobre tus transacciones en formato
              Excel, PowerBi, o incluso ERPs.
            </p>
            {/* <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a> */}
          </div>
          <div className="feature col">
            <div className="feature-icon bg-primary maincolor bg-gradient">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                class="bi bi-file-earmark-lock2"
                viewBox="0 0 16 16"
              >
                <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
            </div>
            <h2 className="fontExo">Seguridad fiscal</h2>
            <p className="fontExo">
              Gracias a la encriptación de la base de datos en SQL, tus datos
              están protegidos bajo garantía de tu cuenta.
            </p>
            {/* <a href="#" className="icon-link">
              Call to action
              <svg className="bi" width="1em" height="1em">
                <use href=""></use>
              </svg>
            </a> */}
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
        <div className="container">
          {/* <!-- Tittle --> */}
          <div className="row mb-4">
            <div className="col-lg-5">
              <h2 className="display-4 font-weight-light fontExo">
                Nuestro equipo
              </h2>
              <p className="font-italic text-muted fontExo">
                Compuesto por los más intrépidos aventureros.
              </p>
            </div>
          </div>
          {/* <!-- Tittle--> */}

          <div className="row text-center justify-content-center align-items-center">
            {/* <!-- Team item--> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_jesús}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0 fontExo">Jesús León</h5>
                <span className="small text-uppercase text-muted fontExo">
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
                <h5 className="mb-0 fontExo">Jhon Téllez</h5>
                <span className="small text-uppercase text-muted fontExo">
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
                <h5 className="mb-0 fontExo">Kevin Bullor</h5>
                <span className="small text-uppercase text-muted fontExo">
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
                <h5 className="mb-0 fontExo">Luis Alberto</h5>
                <span className="small text-uppercase text-muted fontExo">
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
            {/* <span className="team5"> */}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={foto_facundo}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0 fontExo">Facundo Gul</h5>
                <span className="small text-uppercase text-muted fontExo">
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
            {/* </span> */}

            {/* <!-- End--> */}
          </div>
        </div>
      </div>

      {/* <!--    /FEATURE 2     --> */}
    </div>
  );
};
