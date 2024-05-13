import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createOrdenProvision(orden, productos) {
  let resp;
  console.log(orden);
  try {
    await prisma.$transaction(async (tx) => {
      resp = await tx.ordenProvision.create({
        data: {
          fechaRecepcion: orden.fechaRecepcion,
          esCancelada: orden.esCancelada,
          detalles: {
            create: productos.map((prod) => ({
              cantidad: prod.cantidad,
              producto: { connect: { id: prod.id } },
              precio: prod.precio,
            })),
          },
          proveedor: {
            connect: { id: orden.proveedor.id },
          },
        },
      });
    });

    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getOrdenProvisionById(idOrden) {
  try {
    const resp = await prisma.ordenProvision.findUnique({
      where: { id: Number(idOrden) },
      include: { detalles: true },
    });

    return resp;
  } catch (err) {
    throw err;
  }
}

async function cancelOrdenProvision(orden) {
  try {
    const resp = await prisma.ordenProvision.update({
      where: {
        id: orden.id,
      },
      data: {
        esCancelada: orden.esCancelada,
      },
      include: {
        detalles: false,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getOrdenProvisionByIdProveedor(proveedor) {
  try {
    const resp = await prisma.ordenProvision.findMany({
      where: {
        proveedorId: proveedor.id,
      },
      include: {
        detalles: true,
      },
    });
    console.log(resp);

    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllOrdenProvision() {
  try {
    const resp = await prisma.ordenProvision.findMany({
      include: {
        detalles: false,
        proveedor: false,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getOrdenProvisionByFecha(
  fechaGeneracionInicio,
  fechaGeneracionFin,
  fechaRecepcionInicio,
  fechaRecepcionFin
) {
  try {
    const resp = await prisma.ordenProvision.findMany({
      where: {
        fechaGeneracion: {
          lte: fechaGeneracionFin ? new Date(fechaGeneracionFin) : undefined,
          gte: fechaGeneracionInicio
            ? new Date(fechaGeneracionInicio)
            : undefined,
        },
        fechaRecepcion: {
          lte: fechaRecepcionFin ? new Date(fechaRecepcionFin) : undefined,
          gte: fechaRecepcionInicio
            ? new Date(fechaRecepcionInicio)
            : undefined,
        },
      },
      include: {
        detalles: true,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function confirmarOrdenProvision(orden, prod) {
  try {
    await prisma.$transaction(async (tx) => {
      prod.map(async (p) => {
        await tx.producto.update({
          where: {
            id: p.id,
          },
          data: {
            stockActual: p.stockActual,
          },
        });
      });

      const resp = await tx.ordenProvision.update({
        where: {
          id: orden.id,
        },
        data: {
          fechaRecepcion: new Date(),
        },
        include: {
          detalles: false,
        },
      });
    });
    return {
      status: "ok",
      message: "orden confirmada",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateOrdenProvision(orden, productos) {
  try {
    let resp;

    await prisma.$transaction(async (tx) => {
      await tx.ordenProvisionDetalle.deleteMany({
        where: {
          ordenProvisionId: orden.id,
        },
      });

      for (const p of productos) {
        resp = await tx.ordenProvisionDetalle.create({
          data: {
            cantidad: p.cantidad,
            productoId: p.id,
            precio: p.precio,
            ordenProvisionId: orden.id,
          },
        });
      }
    });
    return resp;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default {
  createOrdenProvision,
  getOrdenProvisionById,
  cancelOrdenProvision,
  getOrdenProvisionByIdProveedor,
  confirmarOrdenProvision,
  getOrdenProvisionByFecha,
  updateOrdenProvision,
  getAllOrdenProvision,
};
