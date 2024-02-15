import express from "express";
import { getProveedor } from "../controllers/proveedorControler.js";
import { getProductoById } from "../controllers/productoController.js";
import ordenProvisionService from "../services/orden-provisionService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createOrdenProvision(req, res) {
  try {
    const { idProveedor, listaProductos } = req.body;

    console.log(idProveedor);

    const proveedor = await getProveedor(idProveedor);
    console.log(proveedor);

    console.log("llega asdas");

    const productos = [];

    listaProductos.forEach(async (prod) => {
      const p = await getProductoById(prod.id);
      productos.push(p);
    });

    console.log(proveedor);
    console.log(productos);

    const resp = await ordenProvisionService.createOrdenProvision(
      proveedor,
      productos
    );

    res.send(resp);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
  }
}
