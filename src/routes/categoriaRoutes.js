import { getCategoria } from "../controllers/categoriaController.js";
import express from "express";

const categoriaRouter = express.Router();

categoriaRouter.get("/categoria", getCategoria);
// categoriaRouter.get("/categoria?name:name", getCategoriaByName);

export default categoriaRouter;
