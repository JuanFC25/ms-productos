import proveedorRepository from "../repository/proveedorRepository.js";

async function getProveedorById(id) {
  try {
    const proveedor = await proveedorRepository.getProveedorById(id);
    return proveedor;
  } catch (err) {
    throw err;
  }
}

async function getProveedorByName(name) {
  try {
    const proveedor = await proveedorRepository.getProveedorByName(name);
    return proveedor;
  } catch (err) {
    throw err;
  }
}

async function getProveedorByIdAndName(id, name) {
  try {
    const proveedor = await proveedorRepository.getProveedorByIdAndName(
      id,
      name
    );
    return proveedor;
  } catch (err) {
    throw err;
  }
}

export default {
  getProveedorById,
  getProveedorByName,
  getProveedorByIdAndName,
};
