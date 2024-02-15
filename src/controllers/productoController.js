import express from "express";
import productoService from "../services/productoService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getProductoById(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      const err = new Error("El id suministrado no es valido.");
      err.status = 400;
      throw err;
    }

    const producto = await productoService.getProductoById(id);

    res.send(producto);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getProducto(req, res) {
  try {
    const queryArray = req.query;

    if (queryArray === "") {
      const err = new Error("No ha pasado ningun parametro a la consulta.");
      err.status = 400;
      throw err;
    }

    const resp = await productoService.getProducto(queryArray);

    if (resp.length === 0) {
      const err = new Error(
        "No se encontraron productos con los parametros suministrados."
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

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createProducto(req, res) {
  try {
    const producto = req.body;

    const isEmpty = Object.keys(producto).length !== 5;

    if (isEmpty) {
      const err = new Error("No se pasaron los parametros correctos.");
      err.status = 400;
      throw err;
    }

    const resp = await productoService.createProducto(producto);

    res.send(resp);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function deleteProducto(req, res) {
  try {
    const id = Number(req.params.id);

    if (!id || isNaN(id)) {
      const err = new Error("El id suministrado no es valido.");
      err.status = 400;
      throw err;
    }

    const resp = await productoService.deleteProducto(id);

    res.send(resp);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateProducto(req, res) {
  try {
    const producto = req.body;

    const resp = productoService.updateProducto(producto);

    res.send(resp);
  } catch (err) {
    res.status(404).send({
      message: err.message,
    });
  }
}
