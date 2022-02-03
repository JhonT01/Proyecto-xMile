import React from "react";
import "../../styles/client.css";

export const Client = () => {
  return (
    <div className="client-form">
      <div className=" contenedor-form text-center mt-5 sombra-dark">
        <h2>Crear nuevo cliente</h2>

        <form className="px-4 py-3">
          <div className="mb-3">
            <label htmlfor="cedula" className="form-label">
              Cédula Jurídica
            </label>
            <input
              type="cedula"
              name="cedula"
              className="form-control"
              id="cedula"
              placeholder="Ingresa el número de Cédula Jurídica de tu cliente."
            />
          </div>
          <div className="mb-3">
            <label htmlfor="RazonSocial" className="form-label">
              Razón Social
            </label>
            <input
              type="RazonSocial"
              name="RazonSocial"
              className="form-control"
              id="RazonSocial"
              placeholder="Ingresa la Razón Social de tu cliente."
            />
          </div>
          <div className="mb-3"></div>
          <button type="create" className="btn btn-outline-info">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
};
