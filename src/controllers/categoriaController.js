import express from "express";
import categoriaService from "../services/categoriaService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getCategoria(req, res) {
  try {
    const queryArray = req.query;
    const isEmpty = Object.keys(queryArray).length === 0;

    // si no tengo ningun parametro lanzo error
    if (isEmpty) {
      const err = new Error("No se pasaron parametros a la consulta.");
      err.status = 400;
      throw err;
    }

    const { id, nombre } = queryArray;

    // valido que el id sea un numero
    if (id !== undefined && (isNaN(Number(id)) || id === "")) {
      const err = new Error("El id suministrado no es un numero.");
      err.status = 400;
      throw err;
    }

    // verifico que exista el id en la consulta
    const parsedId = id !== undefined ? Number(id) : undefined;

    const resp = await categoriaService.getCategoria(parsedId, nombre);

    if (resp.length === 0) {
      const err = new Error(
        "No hubo resultados para los parametros suministrados."
      );
      err.status = 404;
      throw err;
    }

    res.send(resp);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
  }
}
