import express from "express";
import {
  getProducto,
  getProductoById,
} from "../controllers/productoController.js";

const productoRouter = express.Router();

productoRouter.get("/producto", getProducto);
productoRouter.get("/producto/:id", getProductoById);

export default productoRouter;
