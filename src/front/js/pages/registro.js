import React, { useContext, useState } from "react";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";
import { Context } from "../store/appContext";

export const Registro = () => {
  //State para iniciar Sesion
  const { store, actions } = useContext(Context);

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    confirmar: "",
  });

  // extraer de usuario
  const { nombre, apellido, email, password, confirmar } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    const formData = usuario;

    let obj = {};

    obj["email"] = usuario.email;

    //formData.append("file", selectedFile);

    //validar campos vacios
    //password de 6 caracteres
    //los dos password iguales
    //enviarlo al action

    fetch(
      "https://3001-jhont01-proyectoxmile-8qyohhug9r5.ws-us30.gitpod.io/registro",
      {
        method: "POST",
        body: JSON.stringify(obj),
      }
    );

    console.log(obj);
  };

  return (
    <div className="form-usuario">
      <div className=" contenedor-form text-center mt-5 sombra-dark">
        <img src={logoIma} />
        <h1 className="fontExo">Registro</h1>

        <form className="px-4 py-7">
          <div className="mb-4">
            <label htmlFor="nombre" className="form-label fontExo">
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
            <label htmlFor="apellido" className="form-label fontExo">
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
            <label htmlFor="email" className="form-label fontExo">
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
            <label htmlFor="password" className="form-label fontExo">
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
            <label htmlFor="confirmar" className="form-label fontExo">
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
            className="btn btn-outline-info fontExo"
            onClick={() => {
              actions.crearUsuario(
                usuario.nombre,
                usuario.apellido,
                usuario.email,
                usuario.password
              );
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};
