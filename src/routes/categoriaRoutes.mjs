import { getCategoria } from "../controllers/categoriaControler.mjs";
import express from "express";

const routes = express.Router();

routes.get("/categoria/", getCategoria);

module.exports = routes;
