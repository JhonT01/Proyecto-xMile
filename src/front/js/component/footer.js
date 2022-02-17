import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
  // <footer className="footer mt-auto py-3 text-center">
  // 	<p>
  // 		Made with <i className="fa fa-heart text-danger" /> by{" "}
  // 		<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
  // 	</p>
  // </footer>

  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a
        href="/"
        className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
      >
        <svg className="bi" width="30" height="24">
          <use href="#bootstrap"></use>
        </svg>
      </a>
      <span className="text-muted">© 2021 Company, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3">
        <p>
          a<i class="fa fa-twitter-square"></i>
        </p>
      </li>
      <li className="ms-3">
        <a className="text-muted" href="#">
          <svg className="bi" width="24" height="24">
            <use href="#instagram"></use>
          </svg>
        </a>
      </li>
      <li className="ms-3">
        <a className="text-muted" href="#">
          <svg className="bi" width="24" height="24">
            <use href="#facebook"></use>
          </svg>
        </a>
      </li>
    </ul>
  </footer>
);
