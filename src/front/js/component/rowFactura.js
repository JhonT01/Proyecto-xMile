import React, { Component, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const RowFactura = (props) => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  return (
    <tr>
      <th scope="row">{props.theId}</th>
      <td>{props.theDoc}</td>
      <td>{props.theFecha}</td>
      <td>{props.theEmisor}</td>
      <td>{props.theEmisorId}</td>
      <td>{props.theConsecutivo}</td>
      <td>{props.theActividad}</td>
      <td>{props.theReceptor}</td>
      <td>{props.theReceptorId}</td>
    </tr>
  );
};

RowFactura.propTypes = {
  theClient: PropTypes.number,
  theId: PropTypes.number,
  theDoc: PropTypes.string,
  theFecha: PropTypes.string,
  theEmisor: PropTypes.string,
  theEmisorId: PropTypes.string,
  theConsecutivo: PropTypes.string,
  theActividad: PropTypes.number,
  theReceptor: PropTypes.string,
  theReceptorId: PropTypes.string,
};
