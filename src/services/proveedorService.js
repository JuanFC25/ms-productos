import proveedorRepository from "../repository/proveedorRepository.js";

async function getProveedor(queryArray) {
  try {
    const { id, nombre } = queryArray;

    // valido que el id sea un numero
    if (id !== undefined && (isNaN(Number(id)) || id === "")) {
      throw new Error("El id suministrado no es un numero.");
    }

    // verifico que exista el id en la consulta
    const parsedId = id !== undefined ? Number(id) : undefined;

    const resp = await proveedorRepository.getProveedor(parsedId, nombre);

    return resp;
  } catch (err) {
    throw err;
  }
}

export default {
  getProveedor,
};
