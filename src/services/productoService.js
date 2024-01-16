import productoRepository from "../repository/productoRepository.js";

async function getProductoById(id) {
  try {
    if (!id || isNaN(id)) {
      throw new Error("El id suministrado no es valido.");
    }

    const resp = await productoRepository.getProductoById(id);
    return resp;
  } catch (err) {
    throw err;
  }
}

async function getProducto(queryArray) {
  const resp = await productoRepository.getProducto(queryArray);
  return resp;
}

export default { getProductoById, getProducto };
