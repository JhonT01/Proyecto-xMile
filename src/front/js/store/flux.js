const BASE_URL =
  "https://3001-jhont01-proyectoxmile-8qyohhug9r5.ws-us31.gitpod.io";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      auth: {
        isAuth: false,
        token: null,
      },
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
    },
  };
};

export default getState;
