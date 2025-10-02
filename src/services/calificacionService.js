import { pool } from "../db.js";

//todas las calificaciones
export const getAllCalificaciones = async () => {
  const result = await pool.query("SELECT * FROM calificaciones");
  return result.rows;
};

//por ID de publicación
export const getCalificacionesByPublicacion = async (publicacionId) => {
  const result = await pool.query(
    "SELECT * FROM calificaciones WHERE publicacionId = $1",
    [publicacionId]
  );
  return result.rows;
};

//Crear
export const postCrearCalificacion = async (publicacionId, usuarioId, calificacion) => {
  const query = `
    INSERT INTO calificaciones (publicacionId, usuarioId, calificacion)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [publicacionId, usuarioId, calificacion]);
  return result.rows[0];
};

//Actualizar
export const actualizarCalificacion = async (calificacionId, calificacion) => {
  const query = `
    UPDATE calificaciones
    SET calificacion = $1
    WHERE calificacionId = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [calificacion, calificacionId]);
  return result.rows[0];
};

//Eliminar
export const eliminarCalificacion = async (calificacionId) => {
  const calificacionAEliminar = await pool.query(
    "SELECT * FROM calificaciones WHERE calificacionId = $1",
    [calificacionId]
  );

  if (calificacionAEliminar.rowCount === 0)
    throw new Error("Calificación no encontrada");

  await pool.query("DELETE FROM calificaciones WHERE calificacionId = $1", [
    calificacionId,
  ]);

  return {
    message: "Calificación eliminada correctamente",
    calificacion: calificacionAEliminar.rows[0],
  };
};
