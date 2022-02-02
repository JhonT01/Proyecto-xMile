import React, { useState } from "react";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

export const Registro = () => {
  //State para iniciar Sesion
  const [usuario, guardarUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: ""
  });

  // extraer de usuario
  const {nombre, apellido, email, password, confirmar } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = () => {
    const formData = usuario;

    let obj = {};

    obj["email"] = usuario.email;

    //formData.append("file", selectedFile);

    fetch(
      "https://3001-jhont01-proyectoxmile-8qyohhug9r5.ws-us30.gitpod.io/login",
      {
        method: "POST",
        body: JSON.stringify(obj),
      }
    );
    // .then((response) => response.json())
    // .then((result) => {
    //   console.log("Success:", result);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    console.log(obj);
  };

  return (
    <div className="form-usuario">
      <div className=" contenedor-form text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1>Registro</h1>

        <form className="px-4 py-7">
          <div className="mb-4">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <input
              className="form-control"
              type="text"
              name="apellido"
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Usuario Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              placeholder="Correo Electronico"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="Contraseña"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmar" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              className="form-control"
              type="password"
              name="confirmar"
              id="confirmar"
              placeholder="Repetir Contraseña"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-outline-info"
            onClick={handleSubmission}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
