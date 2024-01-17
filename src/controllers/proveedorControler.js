import express from "express";
import proveedorService from "../services/proveedorService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getProveedor(req, res) {
  try {
    const queryArray = req.query;
    const isEmpty = Object.keys(queryArray).length === 0;

    // si no tengo ningun parametro lanzo error
    if (isEmpty) {
      throw new Error("No se pasaron parametros a la consulta.");
    }
    const resp = await proveedorService.getProveedor(queryArray);
    if (resp.length === 0) {
      throw new Error("No hubo resultados para los parametros suministrados.");
    }
    res.send(resp);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
}
