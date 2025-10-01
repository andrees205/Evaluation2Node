import { pool } from "../db.js";

// Obtener todos los comentarios
export const getAllComentarios = async () => {
  const result = await pool.query("SELECT * FROM comentarios");
  return result.rows;
};

//comentarios por ID de publicación
export const getComentariosByPublicacion = async (publicacionId) => {
  const result = await pool.query(
    "SELECT * FROM comentarios WHERE publicacionId = $1",
    [publicacionId]
  );
  return result.rows;
};

//comentarios por ID de usuario
export const getComentariosByUsuario = async (usuarioId) => {
  const result = await pool.query(
    "SELECT * FROM comentarios WHERE usuarioId = $1",
    [usuarioId]
  );
  return result.rows;
};

// Crear
export const postCrearComentario = async (publicacionId, usuarioId, comentario) => {
  const query = `
    INSERT INTO comentarios (publicacionId, usuarioId, comentario)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [publicacionId, usuarioId, comentario]);
  return result.rows[0];
};

// Actualizar
export const actualizarComentario = async (comentarioId, comentario) => {
  const query = `
    UPDATE comentarios
    SET comentario = $1
    WHERE comentarioId = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [comentario, comentarioId]);
  return result.rows[0];
};

// Eliminar
export const eliminarComentario = async (comentarioId) => {
  const comentarioAEliminar = await pool.query(
    "SELECT * FROM comentarios WHERE comentarioId = $1",
    [comentarioId]
  );

  if (comentarioAEliminar.rowCount === 0)
    throw new Error("Comentario no encontrado");

  await pool.query("DELETE FROM comentarios WHERE comentarioId = $1", [
    comentarioId,
  ]);

  return {
    message: "Comentario eliminado correctamente",
    comentario: comentarioAEliminar.rows[0],
  };
};
