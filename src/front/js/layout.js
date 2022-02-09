import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Subir_archivo } from "./pages/subir-archivo";
import { Principal } from "./pages/principal";
import injectContext from "./store/appContext";

import { Separador } from "./component/separador";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Separador>
                <Home />
              </Separador>
            </Route>
            <Route exact path="/demo">
              <Separador>
                <Demo />
              </Separador>
            </Route>
            <Route exact path="/single/:theid">
              <Separador>
                <Single />
              </Separador>
            </Route>
            <Route exact path="/subir-archivo">
              <Subir_archivo />
            </Route>
            <Route exact path="/principal/:clientId">
              <Separador>
                <Principal />
              </Separador>
            </Route>
            <Route>
              <Separador>
                <h1>Not found!</h1>
              </Separador>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
