import React, { Component, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ItemCliente = (props) => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  return (
    <Link
      to={`/principal/${props.theId}`}
      className={`col-8 list-group-item list-group-item-action ${
        params.clientId == props.theId && "activo"
      }`}
    >
      <div className="row">
        <div className="col-10">{props.theName}</div>

        <div className="col-2">
          <button
            type="button"
            className="eliminar btn btn-primary justify-content-end"
            onClick={props.theFunction}
          >
            X
          </button>
        </div>
      </div>
    </Link>
  );
};

ItemCliente.propTypes = {
  theName: PropTypes.string,
  theId: PropTypes.number,
  theFunction: PropTypes.func,
};
