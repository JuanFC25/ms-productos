import {
  getAllCategorias,
  getCategoria,
} from "../controllers/categoriaController.js";
import express from "express";

const categoriaRouter = express.Router();

categoriaRouter.get("/categoria", getCategoria);
categoriaRouter.get("/categoria/all", getAllCategorias);

export default categoriaRouter;
