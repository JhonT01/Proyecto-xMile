export const BASE_URL = process.env.BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      auth: {
        isAuth: false,
        token: null,
      },
      fxRate: [],
      mensajeclientecreado: "",
      message: null,
      clients: [],
      facturas: [],
      detalles: [],
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },

    actions: {
      crearUsuario: async (nombre, apellido, email, password) => {
        let urlEndPoint = BASE_URL + "/api/registro";
        let actions = getActions();
        //if para confirmar password +  confirmar
        let nuevoUsuario = {
          nombre: nombre,
          apellido: apellido,
          email: email,
          password: password,
        };
        let response = await fetch(urlEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(nuevoUsuario),
        });
      },

      crearCliente: async (razonsocial, cedulajuridica) => {
        let urlEndPoint = BASE_URL + "/api/client";
        let nuevoCliente = {
          razonsocial: razonsocial,
          cedulajuridica: cedulajuridica,
        };
        console.log(nuevoCliente);
        try {
          let response = await fetch(urlEndPoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(nuevoCliente),
          });
          const data = await response.json();
          setStore({ mensajeclientecreado: data });
          return true;
        } catch (error) {
          return false;
        }
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      getClients: async () => {
        try {
          let response = await fetch(process.env.BACKEND_URL + "/clients");
          let responseObject = await response.json();
          console.log();
          setStore({
            clients: responseObject,
          });
          console.log("CLIENTS SET");
        } catch (error) {
          console.log();
        }
      },
      getFacturas: async () => {
        try {
          let response = await fetch(process.env.BACKEND_URL + "/facturas");
          let responseObject = await response.json();
          console.log();
          setStore({
            facturas: responseObject,
          });
          console.log("FACTURAS SET");
        } catch (error) {
          console.log();
        }
      },
      authHandle: (token, isAuth) => {
        //reset the global store
        setStore({
          auth: {
            isAuth: isAuth,
            token: token,
          },
        });
      },
      cerrarSesion: () => {
        //reset the global store
        sessionStorage.removeItem("access_token");
        setStore({
          auth: {
            isAuth: false,
            token: null,
          },
        });
      },

      getFXRate: async () => {
        try {
          let response = await fetch(
            "https://openexchangerates.org/api/latest.json?app_id=668687a098774224850d3983e6a5ca0f"
          );
          let responseObject = await response.json();
          console.log();
          setStore({
            fxRate: responseObject["rates"],
          });
          console.log("FX SET");
        } catch (error) {
          console.log();
        }
      },
    },
  };
};

export default getState;
