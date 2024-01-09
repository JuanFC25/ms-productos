import {
  getCategoriaById,
  getCategoriaByName,
} from "../controllers/categoriaController.js";
import express from "express";

const categoriaRouter = express.Router();

categoriaRouter.get("/categoria/:id", getCategoriaById);
categoriaRouter.get("/categoria/find/:name", getCategoriaByName);

export default categoriaRouter;
