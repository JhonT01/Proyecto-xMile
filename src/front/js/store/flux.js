const BASE_URL =
  "https://3001-jhont01-proyectoxmile-kt2skh7trnh.ws-us31.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      clients: [],
      facturas: [],
      detalles: [],
      mensajeclientecreado: "",
      message: null,
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
    },
  };
};

export default getState;
