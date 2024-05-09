import {
  getProveedor,
  getAllProveedores,
} from "../controllers/proveedorControler.js";
import express from "express";

const proveedorRouter = express.Router();

proveedorRouter.get("/proveedor", getProveedor);
proveedorRouter.get("/proveedor/all", getAllProveedores);

export default proveedorRouter;
