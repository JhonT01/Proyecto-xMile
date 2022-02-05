const BASE_URL =
  "https://3001-jhont01-proyectoxmile-hhc5ypl7kz4.ws-us30.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
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
        let response = await fetch(urlEndPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(nuevoCliente),
        });
        const data = await response.json();
        console.log(data);
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
    },
  };
};

export default getState;
