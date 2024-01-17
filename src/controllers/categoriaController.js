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
      throw new Error("No se pasaron parametros a la consulta.");
    }
    const resp = await categoriaService.getCategoria(queryArray);

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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
// export async function getCategoriaByName(req, res) {
//   try {
//     const { name } = req.params;

//     console.log(name);

//     const categoria = await categoriaService.getCategoriaByName(name);

//     res.send(categoria);
//   } catch (err) {
//     res.send(err.message);
//   }
// }
