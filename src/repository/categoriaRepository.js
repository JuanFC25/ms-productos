import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCategoria(id, nombre) {
  try {
    const resp = await prisma.categoria.findMany({
      where: {
        id: id,
        nombre: nombre,
      },
      include: {
        productos: true,
      },
    });
    return resp;

    //si no encuentra categoria lanza un error
  } catch (err) {
    throw err;
  }
}

export default {
  getCategoria,
};
