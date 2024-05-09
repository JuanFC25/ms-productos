import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProductoById(id) {
  try {
    const resp = await prisma.producto.findUnique({
      where: { id: Number(id) },
      include: {
        categoria: true,
        proveedor: true,
        OrdenProvisionDetalle: true,
      },
    });
    if (!resp) {
      const err = new Error(`No existe producto con el id ${id}`);
      err.status = 404;
      throw err;
    }

    return resp;
  } catch (err) {
    console.log(err);
    console.log("estoy en catch prodRepository");
    throw err;
  }
}

async function getProducto(
  nombreProducto,
  nombreCategoria,
  idCategoria,
  nombreProveedor,
  idProveedor,
  stock
) {
  const resp = await prisma.producto.findMany({
    where: {
      nombre: nombreProducto,
      categoria: {
        id: idCategoria,
        nombre: nombreCategoria,
      },
      proveedor: {
        id: idProveedor,
        nombre: nombreProveedor,
      },
      stockActual: stock,
    },
    include: {
      categoria: true,
      proveedor: true,
      OrdenProvisionDetalle: true,
    },
  });

  return resp;
}

async function createProducto(
  nombre,
  descripcion,
  idProveedor,
  stock,
  idCategoria,
  precioVenta
) {
  try {
    const resp = await prisma.producto.create({
      data: {
        nombre: nombre,
        descripcion: descripcion,
        stockActual: stock,
        precioVenta: precioVenta,
        proveedor: { connect: { id: idProveedor } },
        categoria: { connect: { id: idCategoria } },
      },
    });

    return resp;
  } catch (err) {
    if (err.code === "P2025") {
      throw new Error("El proveedor o la categoria no exiten.");
    } else {
      throw err;
    }
  }
}

async function deleteProducto(id) {
  try {
    const resp = await prisma.producto.delete({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (err) {
    err.status = 400;

    throw err;
  }
}

async function uptadeProducto(id, nombre, descripcion, stock, precioVenta) {
  try {
    const resp = await prisma.producto.update({
      where: {
        id: id,
      },
      data: {
        descripcion: descripcion,
        stockActual: stock,
        nombre: nombre,
        precioVenta: precioVenta,
      },
      include: {
        categoria: true,
        proveedor: true,
        OrdenProvisionDetalle: true,
      },
    });

    return resp;
  } catch (err) {
    throw err;
  }
}

export default {
  getProductoById,
  getProducto,
  createProducto,
  deleteProducto,
  uptadeProducto,
};
