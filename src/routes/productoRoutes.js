import express from "express";
import {
  getProducto,
  getProductoById,
  createProducto,
  deleteProducto,
  updateProducto,
} from "../controllers/productoController.js";

const productoRouter = express.Router();

productoRouter.get("/api/producto", getProducto);
productoRouter.get("/api/producto/:id", getProductoById);
productoRouter.post("/api/producto", createProducto);
productoRouter.delete("/api/producto/:id", deleteProducto);
productoRouter.patch("/api/producto", updateProducto);

export default productoRouter;
