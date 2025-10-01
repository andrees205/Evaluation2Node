

import * as comentariosServices from "../services/comentarioService.js";


//obtener todo
export const getAllComentarios = async (req, res, next) => {
  try {
    const comentarios = await comentariosServices.getAllComentarios();
    res.json(comentarios);
  } catch (err) {
    return next(err);
  }
};

//comentraios por id de publicacion
export const getComentariosByPublicacion = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;
    const comentarios = await comentariosServices.getComentariosByPublicacion(publicacionId);
    res.json(comentarios);
  } catch (err) {
    return next(err);
  }
};

//comentarios por id de usuario
export const getComentariosByUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const comentarios = await comentariosServices.getComentariosByUsuario(usuarioId);
    res.json(comentarios);
  } catch (err) {
    return next(err);
  }
};


//crear
export const postCrearComentario = async (req, res, next) => {
  try {
    const { publicacionId, usuarioId, comentario } = req.body;
    const nuevoComentario = await comentariosServices.postCrearComentario(
      publicacionId,
      usuarioId,
      comentario
    );
    res.status(201).json(nuevoComentario);
  } catch (err) {
    return next(err);
  }
};

//Actualizar
export const putActualizarComentario = async (req, res, next) => {
  try {
    const { comentarioId } = req.params;
    const { comentario } = req.body;

    const result = await comentariosServices.actualizarComentario(
      comentarioId,
      comentario
    );

    if (!result) {
      throw new Error("Comentario no encontrado");
    }

    res.status(200).json({
      message: "Comentario actualizado correctamente",
      comentario: result,
    });
  } catch (err) {
    return next(err);
  }
};

//Eliminar
export const eliminarComentario = async (req, res, next) => {
  try {
    const { comentarioId } = req.params;
    const result = await comentariosServices.eliminarComentario(comentarioId);
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
