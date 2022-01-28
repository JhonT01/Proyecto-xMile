import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
	<div className="form-usuario">
		<div className=" contenedor-form text-center mt-5 sombra-dark" >
			<img src={logoIma}/>
			<h1>Iniciar Sesión</h1>

			
				<form className="px-4 py-3">
					<div className="mb-3">
						<label 
							htmlfor="exampleDropdownFormEmail1" 
							className="form-label">Usuario Email
						</label>
						<input 
							type="email" 
							className="form-control" 
							id="exampleDropdownFormEmail1" 
							placeholder="email@email.com"/>
					</div>
					<div className="mb-3">
						<label htmlfor="exampleDropdownFormPassword1" className="form-label">Contraseña</label>
						<input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Contraseña"/>
					</div>
					<div className="mb-3">
						<div className="form-check">
							<input type="checkbox" className="form-check-input" id="dropdownCheck"/>
							<label className="form-check-label" htmlfor="dropdownCheck">
						Recordar
						</label>
						</div>
					</div>
					<button type="submit" className="btn btn-outline-info">Iniciar Sesión</button>
				</form>
				<div className="dropdown-divider"></div>
				<a className="dropdown-item" href="#">Registrarse</a>
				<a className="dropdown-item" href="#">¿Olvido su contraseña?</a>
			</div>
			
		
	</div>
	);
};
