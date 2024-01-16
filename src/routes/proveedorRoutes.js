import { getProveedor } from "../controllers/proveedorControler.js";
import express from "express";

const proveedorRouter = express.Router();

proveedorRouter.get("/proveedor", getProveedor);

export default proveedorRouter;
