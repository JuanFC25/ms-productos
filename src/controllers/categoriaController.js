import express from "express";
import categoriaService from "../services/categoriaService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getCategoria(req, res) {
  try {
    const id = req.query.id ? req.query.id : undefined;
    const name = req.query.name ? req.query.name : undefined;

    let resp;

    // si no tengo ningun parametro lanzo error sino busco por los dos
    if (!id && !name) {
      throw new Error("No se pasaron parametros a la consulta.");
    } else if (id && name) {
      resp = await categoriaService.getCategoriaByIdAndName(Number(id), name);
    } else if (!id && name) {
      resp = await categoriaService.getCategoriaByName(name);
    } else {
      resp = await categoriaService.getCategoriaById(Number(id));
    }
    // si no entra en el if de arriba busco por id o por nombre

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
