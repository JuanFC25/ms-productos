import express from "express";
import proveedorService from "../services/proveedorService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getProveedor(req, res) {
  try {
    const id = req.query.id ? req.query.id : undefined;
    const name = req.query.name ? req.query.name : undefined;

    let resp;

    // si no tengo ningun parametro lanzo error sino busco por los dos
    if (!id && !name) {
      throw new Error("No se pasaron parametros a la consulta.");
    } else if (id && name) {
      resp = await proveedorService.getProveedorByIdAndName(Number(id), name);
    } else if (!id && name) {
      resp = await proveedorService.getProveedorByName(name);
    } else {
      resp = await proveedorService.getProveedorById(Number(id));
    }
    // si no entra en el if de arriba busco por id o por nombre

    res.send(resp);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
}
