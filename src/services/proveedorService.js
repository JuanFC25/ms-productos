import proveedorRepository from "../repository/proveedorRepository.js";

async function getProveedor(parsedId, nombre) {
  try {
    const resp = await proveedorRepository.getProveedor(parsedId, nombre);
    return resp;
  } catch (err) {
    throw err;
  }
}

async function getAllProveedores() {
  try {
    const resp = await proveedorRepository.getAllProveedores();
    return resp;
  } catch (err) {
    throw err;
  }
}

export default {
  getProveedor,
  getAllProveedores,
};
