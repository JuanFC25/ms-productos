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
      console.log("[ORDENPROVISIONCONTROLLER] El id suministrado no es un numero.")
      const err = new Error("El id suministrado no es un numero.");
      err.status = 400;
      throw err;
    }

    const proveedor = await proveedorService.getProveedor(idProveedor);
    //console.log(proveedor);

    const productosPromises = listaProductos.map(async (prod) => {
      const p = await productoService.getProductoById(prod.id);
      return p;
    });

    // si esto no da error entonces existen todos los productos
    const productos = await Promise.all(productosPromises);

    listaProductos.forEach((prod) => {
      prod.productoAsociado = productos.find((p) => p.id === prod.id);
    });

    // console.log(listaProductos[0]);
    // console.log(listaProductos[0].productoAsociado);
    const resp = await ordenProvisionService.createOrdenProvision(
      proveedor[0],
      listaProductos
    );

    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    console.log("vuelve hasta aca");
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOrdenProvisionById(req, res) {
  try {
    const idOrden = req.params.id;

    if (Number(idOrden)) {
      const orden = await ordenProvisionService.getOrdenProvisionById(idOrden);

      if (!orden) {
        const err = new Error(`No existe orden con el id: ${idOrden}`);
        err.status = 404;
        throw err;
      }

      res.status(200).send(orden);
    } else {
      const err = new Error("El id debe ser un numero.");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    console.log(err);
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function cancelOrdenProvision(req, res) {
  try {
    const idOrden = req.params.id;

    if (Number(idOrden)) {
      const orden = await ordenProvisionService.cancelOrdenProvision(idOrden);

      if (!orden) {
        const err = new Error(`No existe orden con el id: ${idOrden}`);
        err.status = 404;
        throw err;
      }

      res.status(200).send(orden);
    }
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
export async function getOrdenProvisionByIdProveedor(req, res) {
  try {
    const idProveedor = req.params.id;

    if (Number(idProveedor)) {
      const proveedor = await proveedorService.getProveedor(
        Number(idProveedor)
      );

      if (proveedor.length === 0) {
        const err = new Error(`No existe proveedor con el id: ${idProveedor}`);
        err.status = 404;
        throw err;
      }

      const resp = await ordenProvisionService.getOrdenProvisionByIdProveedor(
        proveedor
      );

      res.status(200).send(resp);
    } else {
      const err = new Error("El id debe ser un numero.");
      err.status = 400;
      throw err;
    }
  } catch (err) {
    console.log(err);
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function getOrdenProvisionByFecha(req, res) {
  try {
    const isEmpty = Object.keys(req.query).length === 0;

    if (isEmpty) {
      // const err = new Error(`No se han pasado fechas para filtrar`);
      // err.status = 404;
      // throw err;
      const resp = await ordenProvisionService.getAllOrdenProvision();
      res.status(200).send(resp);
      return;
    }

    const {
      fechaGeneracionInicio,
      fechaGeneracionFin,
      fechaRecepcionInicio,
      fechaRecepcionFin,
    } = req.query;

    const resp = await ordenProvisionService.getOrdenProvisionByFecha(
      fechaGeneracionInicio,
      fechaGeneracionFin,
      fechaRecepcionInicio,
      fechaRecepcionFin
    );
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function confirmarOrdenProvision(req, res) {
  try {
    const idOrden = req.params.id;

    if (Number(idOrden)) {
      const orden = await ordenProvisionService.getOrdenProvisionById(idOrden);
      if (!orden) {
        const err = new Error(`No existe orden con el id: ${idOrden}`);
        err.status = 404;
        throw err;
      }
      const date = new Date("1969-02-02");
      if (orden.fechaRecepcion.getFullYear() !== date.getFullYear()) {
        const err = new Error(
          `La orden con el id: ${idOrden} ya fue confirmada`
        );
        err.status = 400;
        throw err;
      }

      const resp = await ordenProvisionService.confirmarOrdenProvision(orden);

      res.status(200).send(resp);
    }
  } catch (err) {
    console.log(err);
    res.status(err.status).send({
      message: err.message,
    });
  }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function updateOrdenProvision(req, res) {
  try {
    const id = req.params.id;
    console.log(id);

    const { idProveedor, listaProductos } = req.body;
    console.log("BODY:", req.body);

    const orden = await ordenProvisionService.getOrdenProvisionById(Number(id));
    console.log("orden: ", orden);

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

    console.log("proveedor: ", proveedor);

    if (orden.proveedorId !== proveedor[0].id) {
      const err = new Error(
        `No coincide el id del proveedor suministrado con el id de la orden`
      );
      err.status = 404;
      throw err;
    }

    const productosPromises = listaProductos.map(async (prod) => {
      const p = await productoService.getProductoById(prod.id);
      return p;
    });

    // si esto no da error entonces existen todos los productos
    const productos = await Promise.all(productosPromises);

    listaProductos.forEach((prod) => {
      prod.productoAsociado = productos.find((p) => p.id === prod.id);
    });
    const resp = await ordenProvisionService.updateOrdenProvision(
      orden,
      proveedor[0],
      listaProductos
    );
    console.log("RESP ", resp);
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(err.status).send({
      message: err.message,
    });
  }
}
