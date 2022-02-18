import React, { Component } from "react";
import "../../styles/footer.css";
import geeks from "../../img/4geeks-logo.webp"

export const Footer = () => (
  // <footer className="footer mt-auto py-3 text-center">
  // 	<p>
  // 		Made with <i className="fa fa-heart text-danger" /> by{" "}
  // 		<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
  // 	</p>
  // </footer>

  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="https://4geeksacademy.com/"><img src={geeks} alt="4geeksacademy" width="95" height="25" className="mgeek"></img></a>
      <span className="text-muted mleft fontExo "> © 4Geeks Academy LLC 2019</span>
    </div>
    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3 inline">
          <a href="https://github.com/4GeeksAcademy"><i className="fa fa-github set"></i></a>
          <a href="https://www.facebook.com/4geeksacademy/"><i className="fa fa-facebook set"></i></a>
          <a href="https://twitter.com/4GeeksAcademy"><i className="fa fa-twitter set"></i></a>
          <a href="https://www.instagram.com/4GeeksAcademy/"><i className="fa fa-instagram set"></i></a>
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
