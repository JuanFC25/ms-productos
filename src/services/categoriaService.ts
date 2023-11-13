import express from "express";
import * as categoriaService from "./categoriaService";

export async function getCategoria(idCategoria?: number, nombre?: number) {
  const categoria = await categoriaService.getCategoria;
}
