import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCategoriaById(id) {
  try {
    const resp = await prisma.categoria.findUnique({
      where: { id: id },
      include: { productos: true },
    });
    if (!resp) {
      throw new Error(`no existe categoria con el id ${id}`);
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getCategoriaByName(name) {
  try {
    const resp = await prisma.categoria.findFirst({
      where: { nombre: name },
      include: { productos: true },
    });
    if (!resp) {
      throw new Error(`no existe categoria con el nombre ${name}`);
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getCategoriaByIdAndName(idCategoria, name) {
  try {
    const resp = await prisma.categoria.findFirst({
      where: { nombre: name, id: idCategoria },
      include: { productos: true },
    });
    if (!resp) {
      throw new Error(
        `no existe categoria con el id ${idCategoria} y nombre ${name}`
      );
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getCategoriaById,
  getCategoriaByName,
  getCategoriaByIdAndName,
};
