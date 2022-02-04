import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

// Se importa para probar el funcionamiento del Dropzone en la pagina principal, borrar e importar donde sea necesario
import { Dropzone } from "../component/dropzone-component";

export const Subir_archivo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="form-usuario">
      <div className="contenedor-form border text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1>Subir archivos</h1>

        <Dropzone />
      </div>
    </div>
  );
};
