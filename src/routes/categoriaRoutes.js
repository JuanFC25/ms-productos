import {
  getAllCategorias,
  getCategoria,
} from "../controllers/categoriaController.js";
import express from "express";

const categoriaRouter = express.Router();

categoriaRouter.get("/api/categoria", getCategoria);
categoriaRouter.get("/api/categoria/all", getAllCategorias);

export default categoriaRouter;
