import express from "express";
import productoService from "../services/productoService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getProductoById(req, res) {
  try {
    const { id } = req.params;
    await productoService.getProductoById(id);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
}

export async function getProducto(req, res) {
  try {
    const queryArray = req.query;

    if (queryArray === "")
      throw new Error("No ha pasado ningun parametro a la consulta.");

    await productoService.getProducto(queryArray);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
}
