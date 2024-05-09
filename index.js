import express from "express";
import cors from "cors";
import categoriaRouter from "./src/routes/categoriaRoutes.js";
import proveedorRouter from "./src/routes/proveedorRoutes.js";
import productoRouter from "./src/routes/productoRoutes.js";
import ordenProvisionRouter from "./src/routes/ordenProvisionRoutes.js";

const app = express();

// Middleware para analizar el cuerpo de la solicitud
app.use(express.urlencoded({ extended: true })); // disponible en el body
app.use(express.json());
app.use(cors());
app.set("port", 3000);

//Routes
app.use(categoriaRouter);
app.use(proveedorRouter);
app.use(productoRouter);
app.use(ordenProvisionRouter);

//Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
