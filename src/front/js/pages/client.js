import React, { useContext, useState } from "react";
import logoIma from "../../img/Xmile.png";
import "../../styles/client.css";
import { Context } from "../store/appContext";

export const Client = () => {
  const { store, actions } = useContext(Context);

  const [cliente, setCliente] = useState({
    razonSocial: "",
    cedulaJuridica: "",
  });

  // extraer de cliente
  const { razonSocial, cedulaJuridica } = cliente;

  const onChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-cliente">
      <div className=" contenedor-form text-center mt-1 sombra-dark">
        <img src={logoIma} />
        <h1>Crear Cliente</h1>

        <form className="px-4 py-4">
          <div className="mb-4">
            <label htmlFor="razonSocial" className="form-label">
              Razón Social
            </label>
            <input
              className="form-control"
              type="text"
              name="razonSocial"
              id="razonSocial"
              placeholder="Razón Social"
              value={razonSocial}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cedulaJuridica" className="form-label">
              Cédula juridica
            </label>
            <input
              className="form-control"
              type="text"
              name="cedulaJuridica"
              id="cedulaJuridica"
              placeholder="Cédula juridica"
              value={cedulaJuridica}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-info"
            onClick={(e) => {
              e.preventDefault();
              actions.crearCliente(razonSocial, cedulaJuridica);
            }}
          >
            Crear Cliente
          </button>
          {store.mensajeclientecreado &&
            store.mensajeclientecreado == "recibido" && (
              <div
                className="alert alert-success d-flex align-items-center"
                role="alert"
              >
                <svg
                  className="bi flex-shrink-0 me-2"
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Success:"
                ></svg>
                <div>Cliente creado exitosamente.</div>
              </div>
            )}
          {store.mensajeclientecreado &&
            store.mensajeclientecreado ==
              "Cliente existente. Registre nuevo cliente" && (
              <div
                className="alert alert-warning d-flex align-items-center"
                role="alert"
              >
                <svg
                  className="bi flex-shrink-0 me-2"
                  width="24"
                  height="24"
                  role="img"
                  aria-label="Warning:"
                ></svg>
                <div>Cliente ya existente. Ingrese un nuevo cliente.</div>
              </div>
            )}
        </form>
      </div>
    </div>
  );
};
