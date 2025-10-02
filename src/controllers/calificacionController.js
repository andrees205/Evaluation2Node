import * as calificacionServices from "../services/calificacionService.js";

//todas las calificaciones
export const getAllCalificaciones = async (req, res, next) => {
  try {
    const calificaciones = await calificacionServices.getAllCalificaciones();
    res.json(calificaciones);
  } catch (err) {
    return next(err);
  }
};

//Calificaciones por id de publicación
export const getCalificacionesByPublicacion = async (req, res, next) => {
  try {
    const { publicacionId } = req.params;
    const calificaciones = await calificacionServices.getCalificacionesByPublicacion(publicacionId);
    res.json(calificaciones);
  } catch (err) {
    return next(err);
  }
};


//crear
export const postCrearCalificacion = async (req, res, next) => {
  try {
    const { publicacionId, usuarioId, calificacion } = req.body;
    const nuevaCalificacion = await calificacionServices.postCrearCalificacion(
      publicacionId,
      usuarioId,
      calificacion
    );
    res.status(201).json(nuevaCalificacion);
  } catch (err) {
    return next(err);
  }
};

//actualiza
export const putActualizarCalificacion = async (req, res, next) => {
  try {
    const { calificacionId } = req.params;
    const { calificacion } = req.body;

    const result = await calificacionServices.actualizarCalificacion(
      calificacionId,
      calificacion
    );

    if (!result) {
      throw new Error("Calificación no encontrada");
    }

    res.status(200).json({
      message: "Calificación actualizada correctamente",
      calificacion: result,
    });
  } catch (err) {
    return next(err);
  }
};

//Eliminar
export const eliminarCalificacion = async (req, res, next) => {
  try {
    const { calificacionId } = req.params;
    const result = await calificacionServices.eliminarCalificacion(calificacionId);
    res.status(200).json(result);
  } catch (err) {
    return next(err);
  }
};
