import categoriaRepository from "../repository/categoriaRepository.js";

// export async function getCategoria(idCategoria, nombre?: number) {
//   const categoria = await categoriaService.getCategoria;
// }

// async function getCategoriaById(idCategoria) {
//   try {
//     const categoria = await categoriaRepository.getCategoriaById(idCategoria);
//     return categoria;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getCategoriaByName(name) {
//   try {
//     const categoria = await categoriaRepository.getCategoriaByName(name);
//     return categoria;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getCategoriaByIdAndName(idCategoria, name) {
//   try {
//     const categoria = await categoriaRepository.getCategoriaByIdAndName(
//       idCategoria,
//       name
//     );
//     return categoria;
//   } catch (err) {
//     throw err;
//   }
// }

async function getCategoria(queryArray) {
  try {
    const { id, nombre } = queryArray;

    // valido que el id sea un numero
    if (id !== undefined && (isNaN(Number(id)) || id === "")) {
      throw new Error("El id suministrado no es un numero.");
    }

    // verifico que exista el id en la consulta
    const parsedId = id !== undefined ? Number(id) : undefined;

    const resp = await categoriaRepository.getCategoria(parsedId, nombre);

    return resp;
  } catch (err) {
    throw err;
  }
}
export default {
  getCategoria,
};
