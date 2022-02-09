import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import logoIma from "../../img/Prototipo3.png";
import "../../styles/principal.css";
import { ItemCliente } from "../component/itemCliente";
import { RowFactura } from "../component/rowFactura";

export const Principal = () => {
  const { store, actions } = useContext(Context);

  const params = useParams();

  console.log(store);

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <p className="bienvenida">Bienvenid@, John Doe. </p>
        </div>

        <div className="row justify-content-md-center mt-3">
          <div className="col-3">
            <h1 className="titulo">Listado de Clientes</h1>
            <div className="list-group">
              {store.clients.length > 0 ? (
                store.clients.map((cliente) => {
                  return (
                    <ItemCliente
                      key={cliente.id}
                      theName={cliente.razon_social}
                      theId={cliente.id}
                    />
                  );
                })
              ) : (
                <div>Cargando</div>
              )}
            </div>
          </div>
          <div className="col-8">
            <h1 className="titulo">Detalle de Facturas</h1>
            <table className="table">
              <thead>
                <tr>
                  <th className="tableHeader" scope="col">
                    id
                  </th>
                  <th className="tableHeader" scope="col">
                    Documento Origen
                  </th>
                  <th className="tableHeader" scope="col">
                    Fecha
                  </th>
                  <th className="tableHeader" scope="col">
                    Emisor
                  </th>
                  <th className="tableHeader" scope="col">
                    ID Emisor
                  </th>
                  <th className="tableHeader" scope="col">
                    Consecutivo
                  </th>
                  <th className="tableHeader" scope="col">
                    Actividad
                  </th>
                  <th className="tableHeader" scope="col">
                    Receptor
                  </th>
                  <th className="tableHeader" scope="col">
                    ID Receptor
                  </th>
                </tr>
              </thead>
              <tbody>
                {store.facturas.length > 0 ? (
                  store.facturas.map((factura) => {
                    if (factura.cliente_id == params.clientId) {
                      return (
                        <RowFactura
                          key={factura.id}
                          theId={factura.id}
                          theDoc={factura.doc}
                          theFecha={factura.fecha}
                          theEmisor={factura.emisor}
                          theEmisorId={factura.emisor_id}
                          theConsecutivo={factura.num_fac}
                          theActividad={factura.actividad}
                          theReceptor={factura.receptor}
                          theReceptorId={factura.receptor_id}
                        />
                      );
                    }
                  })
                ) : (
                  <span>Cargando</span>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
