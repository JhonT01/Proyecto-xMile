import React, { Component, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ItemClienteSubir = (props) => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  return (
    <Link
      to={`/subir-archivo/${props.theId}`}
      className={`list-group-item list-group-item-action ${
        params.clientId == props.theId && "activo"
      }`}
    >
      {props.theName}
    </Link>
  );
};

ItemClienteSubir.propTypes = {
  theName: PropTypes.string,
  theId: PropTypes.number,
};
