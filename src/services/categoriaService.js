import categoriaRepository from "../repository/categoriaRepository.js";

async function getCategoria(parsedId, nombre) {
  try {
    const resp = await categoriaRepository.getCategoria(parsedId, nombre);

    return resp;
  } catch (err) {
    throw err;
  }
}
export default {
  getCategoria,
};
