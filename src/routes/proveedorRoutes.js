import {
  getProveedor,
  getAllProveedores,
} from "../controllers/proveedorControler.js";
import express from "express";

const proveedorRouter = express.Router();

proveedorRouter.get("/api/proveedor", getProveedor);
proveedorRouter.get("/api/proveedor/all", getAllProveedores);

export default proveedorRouter;
