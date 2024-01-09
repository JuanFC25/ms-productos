import express from "express";
import categoriaService from "../services/categoriaService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getCategoriaById(req, res) {
  try {
    const { id } = req.params;

    console.log(id);

    const categoria = await categoriaService.getCategoriaById(Number(id));

    res.send(categoria);
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
export async function getCategoriaByName(req, res) {
  try {
    const { name } = req.params;

    console.log(name);

    const categoria = await categoriaService.getCategoriaByName(name);

    res.send(categoria);
  } catch (err) {
    res.send(err.message);
  }
}
