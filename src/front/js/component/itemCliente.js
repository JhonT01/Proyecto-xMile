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
      className={`list-group-item list-group-item-action ${
        params.clientId == props.theId && "activo"
      }`}
    >
      {props.theName}
    </Link>
  );
};

ItemCliente.propTypes = {
  theName: PropTypes.string,
  theId: PropTypes.number,
};
