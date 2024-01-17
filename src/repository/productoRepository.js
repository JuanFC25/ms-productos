import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProductoById(id) {
  try {
    const resp = await prisma.producto.findUnique({
      where: { id: Number(id) },
      include: {
        categoria: true,
        proveedor: true,
      },
    });
    if (!resp) throw new Error(`No existe producto con el id ${id}`);

    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// async function getProducto(queryArray) {
//   const { nombre, nombreProveedor,  , stock } = queryArray;

//   try {
//     const resp = await prisma.producto.findMany({
//       where: {
//         nombre: nombre,
//         categoriaId: Number(categoria),
//         stockActual: stock,
//         proveedorId: Number(nombreProveedor),
//       },
//       include: {
//         categoria: true,
//         proveedor: true,
//       },
//     });
//     console.log(resp);
//     if (!resp)
//       throw new Error("No existe producto con los parametros suministrados.");

//     return resp;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   }
// }

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
  idCategoria
) {
  try {
    const resp = await prisma.producto.create({
      data: {
        nombre: nombre,
        descripcion: descripcion,
        stockActual: stock,
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
    throw err;
  }
}

async function uptadeProducto(id, nombre, descripcion, stock) {
  try {
    const resp = await prisma.producto.update({
      where: {
        id: id,
      },
      data: {
        descripcion: descripcion,
        stockActual: stock,
        nombre: nombre,
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
