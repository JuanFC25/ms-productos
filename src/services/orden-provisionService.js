import ordenProvisionRepository from "../repository/ordenProvisionRepository.js";
import productoService from "./productoService.js";

async function createOrdenProvision(proveedor, productos) {
  try {
    const ordenProvision = {
      fechaRecepcion: new Date("01-01-1969"),
      esCancelada: false,
      proveedor: proveedor,
      detalles: null,
    };

    // verifica que todos los productos pertenezcan al mismo proveedor
    productos.forEach((prod) => {
      if (prod.productoAsociado.proveedorId !== proveedor.id) {
        const err = new Error(
          "Uno o mas productos no pertenecen al proveedor suministrado"
        );
        err.status = 400;
        throw err;
      }
    });

    const resp = await ordenProvisionRepository.createOrdenProvision(
      ordenProvision,
      productos
    );
    return resp;
  } catch (err) {
    throw err;
  }
}

async function getOrdenProvisionById(idOrden) {
  try {
    const orden = ordenProvisionRepository.getOrdenProvisionById(idOrden);
    return orden;
  } catch (err) {
    throw err;
  }
}

async function cancelOrdenProvision(idOrden) {
  try {
    const orden = await getOrdenProvisionById(idOrden);

    if (orden.esCancelada === true) {
      const err = new Error(
        `La orden con id: ${idOrden} ya se encuentra cancelada`
      );
      err.status = 400;
      throw err;
    }

    orden.esCancelada = true;
    const resp = await ordenProvisionRepository.cancelOrdenProvision(orden);
    return resp;
  } catch (err) {
    throw err;
  }
}

async function getOrdenProvisionByIdProveedor(proveedor) {
  try {
    const resp = await ordenProvisionRepository.getOrdenProvisionByIdProveedor(
      proveedor[0]
    );
    return resp;
  } catch (err) {
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
    const resp = await ordenProvisionRepository.getOrdenProvisionByFecha(
      fechaGeneracionInicio,
      fechaGeneracionFin,
      fechaRecepcionInicio,
      fechaRecepcionFin
    );
    return resp;
  } catch (err) {
    throw err;
  }
}

async function confirmarOrdenProvision(orden) {
  try {
    console.log("listaProductos:");
    const listaProductos = orden.detalles;
    console.log(listaProductos);

    const productosPromises = listaProductos.map(async (prod) => {
      const p = await productoService.getProductoById(prod.productoId);
      return p;
    });

    // si esto no da error entonces existen todos los productos
    const productos = await Promise.all(productosPromises);

    // actualizo el stock para cada producto de la orden
    productos.forEach((prod) => {
      const p = listaProductos.find((p) => p.productoId === prod.id);
      prod.stockActual = prod.stockActual + p.cantidad;
      return prod;
    });

    const resp = ordenProvisionRepository.confirmarOrdenProvision(
      orden,
      productos
    );

    return resp;
  } catch (err) {
    throw err;
  }
}

async function updateOrdenProvision(orden, proveedor, productos) {
  try {
    // verifica que todos los productos pertenezcan al mismo proveedor
    productos.forEach((prod) => {
      if (prod.productoAsociado.proveedorId !== proveedor.id) {
        const err = new Error(
          "Uno o mas productos no pertenecen al proveedor suministrado"
        );
        err.status = 400;
        throw err;
      }
    });

    const resp = await ordenProvisionRepository.updateOrdenProvision(
      orden,
      productos
    );

    return resp;
  } catch (err) {
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
};
