import express from "express";
import categoriaRouter from "./src/routes/categoriaRoutes.js";
import proveedorRouter from "./src/routes/proveedorRoutes.js";

const app = express();

app.set("port", 3000);

//Routes
app.use(categoriaRouter);
app.use(proveedorRouter);

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
