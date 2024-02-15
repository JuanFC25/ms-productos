import ordenProvisionRepository from "../repository/ordenProvisionRepository.js";

async function createOrdenProvision(proveedor, productos) {
  try {
    const ordenProvision = {
      fechaRecepcion: new Date("01-01-1969"),
      esCancelada: false,
      proveedor: proveedor,
      detalles: null,
    };

    productos.forEach((prod) => {
      console.log(prod.productoAsociado.proveedorId);
      console.log(proveedor.id);
      if (prod.productoAsociado.proveedorId !== proveedor.id) {
        const err = new Error(
          "Uno o mas productos no pertenecen al proveedor suministrado"
        );
        err.status = 400;
        throw err;
      }
    });
    console.log("asdasd");

    await ordenProvisionRepository.createOrdenProvision(
      ordenProvision,
      productos
    );
  } catch (err) {
    throw err;
  }
}

export default {
  createOrdenProvision,
};
