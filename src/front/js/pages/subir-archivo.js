import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useDropzone } from "react-dropzone";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

import { Dropzone } from "../component/dropzone-component";
import { ItemClienteSubir } from "../component/itemClienteSubir";

export const Subir_archivo = () => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  const { acceptedFiles, fileRejections, getRootProps, getInputProps, open } =
    useDropzone({
      accept: ".xml",
      noClick: false,
      noKeyboard: true,
    });

  const enviarArchivo = (data) => {
    data.forEach(function (element) {
      const formData = new FormData();
      formData.append("file", element);
      formData.append("client_id", params.clientId);

      fetch(
        "https://3001-jhont01-proyectoxmile-ayu39oih1lc.ws-us31.gitpod.io/subir",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  };

  return (
    <>
      <div className="form-usuario">
        <div className="contenedor-form border text-center mt-5 sombra-dark">
          <img src={logoIma} />
          <h1>Subir archivos</h1>
          <div className="list-group">
            {store.clients.length > 0 ? (
              store.clients.map((cliente) => {
                return (
                  <ItemClienteSubir
                    key={cliente.id}
                    theName={cliente.razon_social}
                    theId={cliente.id}
                  />
                );
              })
            ) : (
              <div>Cargando</div>
            )}
          </div>

          <Dropzone
            acceptedFiles={acceptedFiles}
            fileRejections={fileRejections}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            open={open}
          />

          <div className="container mt-2 mb-2">
            <button
              type="button"
              className="btn"
              onClick={() => {
                enviarArchivo(acceptedFiles);
              }}
            >
              Subir Archivos
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
