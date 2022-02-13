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
      clients: [],
      facturas: [],
      detalles: [],
      fxRate: [],
    },
    actions: {
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
