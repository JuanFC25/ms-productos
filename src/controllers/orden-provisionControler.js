import express from "express";
import proveedorService from "../services/proveedorService.js";
import productoService from "../services/productoService.js";
import ordenProvisionService from "../services/orden-provisionService.js";

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createOrdenProvision(req, res) {
  try {
    const { idProveedor, listaProductos } = req.body;

    // valido que el idProveedor sea un numero
    if (
      idProveedor !== undefined &&
      (isNaN(Number(idProveedor)) || idProveedor === "")
    ) {
      const err = new Error("El id suministrado no es un numero.");
      err.status = 400;
      throw err;
    }

    const proveedor = await proveedorService.getProveedor(idProveedor);
    console.log(proveedor);

    const productosPromises = listaProductos.map(async (prod) => {
      const p = await productoService.getProductoById(prod.id);
      return p;
    });

    const productos = await Promise.all(productosPromises);

    listaProductos.forEach((prod) => {
      prod.productoAsociado = productos.find((p) => p.id === prod.id);
    });

    console.log(listaProductos[0]);
    console.log(listaProductos[0].productoAsociado);
    const resp = await ordenProvisionService.createOrdenProvision(
      proveedor[0],
      listaProductos
    );

    res.send(resp);
  } catch (err) {
    console.log(err);
    console.log("vuelve hasta aca");
    res.status(err.status).send({
      message: err.message,
    });
  }
}
