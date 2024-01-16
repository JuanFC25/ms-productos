import categoriaRepository from "../repository/categoriaRepository.js";

// export async function getCategoria(idCategoria, nombre?: number) {
//   const categoria = await categoriaService.getCategoria;
// }

async function getCategoriaById(idCategoria) {
  try {
    const categoria = await categoriaRepository.getCategoriaById(idCategoria);
    return categoria;
  } catch (err) {
    throw err;
  }
}

async function getCategoriaByName(name) {
  try {
    const categoria = await categoriaRepository.getCategoriaByName(name);
    return categoria;
  } catch (err) {
    throw err;
  }
}

async function getCategoriaByIdAndName(idCategoria, name) {
  try {
    const categoria = await categoriaRepository.getCategoriaByIdAndName(
      idCategoria,
      name
    );
    return categoria;
  } catch (err) {
    throw err;
  }
}

export default {
  getCategoriaById,
  getCategoriaByName,
  getCategoriaByIdAndName,
};
