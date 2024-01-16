import express from "express";
import categoriaRouter from "./src/routes/categoriaRoutes.js";
import proveedorRouter from "./src/routes/proveedorRoutes.js";
import productoRouter from "./src/routes/productoRoutes.js";

const app = express();

app.set("port", 3000);

//Routes
app.use(categoriaRouter);
app.use(proveedorRouter);
app.use(productoRouter);

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
