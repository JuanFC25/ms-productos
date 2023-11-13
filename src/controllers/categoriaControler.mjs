export async function getCategoria(req, res) {
  const id = req.idCategoria;
  const categoria = req.nombreCategoria;

  console.log(categoria);
  console.log(id);

  //const nombre = req.params.idCategoria;

  // if (!!id) {
  //     if(!!nombre) {
  //         const categoria = await categoriaService.getCategoria(id, nombre);
  //     }
  // }
}

export async function func2(req, res) {
  console.log(req);
}
