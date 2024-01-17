import express from "express";
import {
  getProducto,
  getProductoById,
  createProducto,
  deleteProducto,
  updateProducto,
} from "../controllers/productoController.js";

const productoRouter = express.Router();

productoRouter.get("/producto", getProducto);
productoRouter.get("/producto/:id", getProductoById);
productoRouter.post("/producto", createProducto);
productoRouter.delete("/producto/:id", deleteProducto);
productoRouter.patch("/producto", updateProducto);

export default productoRouter;
