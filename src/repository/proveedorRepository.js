import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProveedor(id, nombre) {
  try {
    const resp = await prisma.proveedor.findMany({
      where: {
        id: id,
        nombre: nombre,
      },
      include: {
        productos: true,
      },
    });

    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getAllProveedores() {
  try {
    const resp = await prisma.proveedor.findMany({
      include: {
        productos: false,
        ordenesDeProvision: false,
      },
    });
    return resp;
  } catch (err) {
    throw err;
  }
}

export default {
  getProveedor,
  getAllProveedores,
};
