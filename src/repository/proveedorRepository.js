import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getProveedorById(id) {
  try {
    const resp = await prisma.proveedor.findUnique({
      where: { id: id },
    });
    if (!resp) {
      throw new Error(`no existe proveedor con el id ${id}`);
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getProveedorByName(name) {
  try {
    const resp = await prisma.proveedor.findFirst({
      where: { nombre: name },
    });
    if (!resp) {
      throw new Error(`no existe proveedor con el nombre ${name}`);
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

async function getProveedorByIdAndName(id, name) {
  try {
    const resp = await prisma.proveedor.findFirst({
      where: { nombre: name, id: id },
    });
    if (!resp) {
      throw new Error(`no existe proveedor con el id ${id} y nombre ${name}`);
    }
    return resp;
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getProveedorById,
  getProveedorByName,
  getProveedorByIdAndName,
};
