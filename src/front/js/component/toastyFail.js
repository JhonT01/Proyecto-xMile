import React, { Component, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ToastyFail = (props) => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  return (
    <div
      id="toastyFail"
      className="toast move"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">Aviso</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{props.mensaje}</div>
    </div>
  );
};

ToastyFail.propTypes = {
  mensaje: PropTypes.string,
};
