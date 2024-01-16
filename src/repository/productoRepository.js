import { PrismaClient } from "@prisma/client";
import { error } from "console";

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

async function getProducto(queryArray) {
  const { nombre, nombreProveedor, , stock } = queryArray;

  try {
    const resp = await prisma.producto.findMany({
      where: {
        nombre: nombre,
        categoriaId: Number(categoria),
        stockActual: stock,
        proveedorId: Number(nombreProveedor),
      },
      include: {
        categoria: true,
        proveedor: true,
      },
    });
    console.log(resp);
    if (!resp)
      throw new Error("No existe producto con los parametros suministrados.");

    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { getProductoById, getProducto };
