import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createOrdenProvision(orden, productos) {
  console.log(orden);
  try {
    await prisma.$transaction(async (tx) => {
      const ordenProvision = await tx.ordenProvision.create({
        data: {
          fechaRecepcion: orden.fechaRecepcion,
          esCancelada: orden.esCancelada,
          detalles: {
            create: productos.map((prod) => ({
              cantidad: prod.cantidad,
              producto: { connect: { id: prod.productoAsociado.id } },
              precio: prod.precio,
            })),
          },
          proveedor: {
            connect: { id: orden.proveedor.id },
          },
        },
      });
    });

    return;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default { createOrdenProvision };
