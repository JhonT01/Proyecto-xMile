import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useDropzone } from "react-dropzone";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

import { Dropzone } from "../component/dropzone-component";

export const Subir_archivo = () => {
  const { store, actions } = useContext(Context);

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

      fetch(
        "https://3001-jhont01-proyectoxmile-zot1a83ns2i.ws-us30.gitpod.io/subir",
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
    <div className="form-usuario">
      <div className="contenedor-form border text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1>Subir archivos</h1>

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
  );
};
