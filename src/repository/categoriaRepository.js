import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getCategoriaById(id) {
  try {
    const resp = await prisma.categoria.findUnique({
      where: { id: id },
    });
    if (!resp) {
      throw new Error("no existe");
    }
    return a;
  } catch (err) {
    throw new Error("Error en categoriaRepository: " + err.message);
  }
}

async function getCategoriaByName(name) {
  try {
    return prisma.categoria.findFirst({
      where: { nombre: name },
    });
  } catch (err) {
    throw new Error("Error en categoriaRepository: " + err.message);
  }
}

export default { getCategoriaById, getCategoriaByName };
