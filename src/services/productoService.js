import productoRepository from "../repository/productoRepository.js";
import categoriaService from "../services/categoriaService.js";
import proveedorService from "../services/proveedorService.js";

async function getProductoById(id) {
  try {
    const resp = await productoRepository.getProductoById(id);
    return resp;
  } catch (err) {
    console.log("estoy en catch prodService");
    throw err;
  }
}

async function getProducto(queryArray) {
  const {
    nombreProducto,
    nombreCategoria,
    idCategoria,
    nombreProveedor,
    idProveedor,
    stock,
  } = queryArray;

  // obtengo categoria si hay datos
  // const categoria = await categoriaService.getCategoria({
  //   id: idCategoria,
  //   nombre: nombreCategoria,
  // });

  // // obtengo proveedor si hay datos
  // const proveedor = await proveedorService.getProveedor({
  //   id: idProveedor,
  //   nombre: nombreProveedor,
  // });

  // const cat = categoria.length === 0 ? undefined : categoria[0];
  // const prov = proveedor.length === 0 ? undefined : proveedor[0];

  // valido el stock

  const resp = await productoRepository.getProducto(
    nombreProducto,
    nombreCategoria,
    idCategoria !== undefined ? Number(idCategoria) : undefined,
    nombreProveedor,
    queryArray.idProveedor !== undefined ? Number(idProveedor) : undefined,
    queryArray.stock !== undefined ? Number(stock) : undefined
  );
  return resp;
}

async function createProducto(producto) {
  try {
    const {
      nombre,
      descripcion,
      idProveedor,
      stock,
      idCategoria,
      precioVenta,
    } = producto;

    const resp = await productoRepository.createProducto(
      nombre,
      descripcion,
      Number(idProveedor),
      Number(stock),
      Number(idCategoria),
      Number(precioVenta)
    );

    return resp;
  } catch (err) {
    throw err;
  }
}

async function deleteProducto(id) {
  try {
    const resp = await productoRepository.deleteProducto(id);
    return resp;
  } catch (err) {
    throw err;
  }
}

async function updateProducto(producto) {
  try {
    const { id, nombre, descripcion, stock, precioVenta } = producto;

    const resp = await productoRepository.uptadeProducto(
      Number(id),
      nombre,
      descripcion,
      isNaN(Number(stock)) ? undefined : Number(stock),
      Number(precioVenta)
    );

    return resp;
  } catch (err) {
    throw err;
  }
}
export default {
  getProductoById,
  getProducto,
  createProducto,
  deleteProducto,
  updateProducto,
};
