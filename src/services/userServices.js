import { pool } from '../db.js';

export const obtenerUsuarios = async () => {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
};

export const obtenerUsuariosPorApellido = async (apellido) => {
  const buscar = `%${apellido}%`;
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE apellido ILIKE $1",
    [buscar]
  );
  return result.rows;
};

export const obtenerUsuariosPorRol = async (rolId) => {
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE rolId = $1",
    [rolId]
  );
  return result.rows;
};

export const crearUsuario = async (rolId, nombreUsuario, clave, nombre, apellido) => {
        const query = `INSERT INTO usuarios
        (rolId, nombreUsuario, clave, nombre, apellido)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;`;
        const result = await pool.query(query, [rolId, nombreUsuario, clave, nombre, apellido]);
        return result.rows[0];
};

export const actualizarUsuario = async ( usuarioId, rolId, nombreUsuario, clave, nombre, apellido )=> {
    const values= [ usuarioId, rolId, nombreUsuario, clave, nombre, apellido];
    const query = `UPDATE usuarios
                   SET rolId=$1, nombreUsuario=$2, clave=$3, nombre=$4, apellido=$5
                   WHERE usuarioId=$6
                   RETURNING *;`;

        const result = await pool.query(query, values);
        return result;
};

export const eliminarUsuario = async (usuarioId) => {

        const usuarioEliminar = await pool.query("SELECT * FROM usuarios WHERE usuarioId=$1", [usuarioId]);
        if (usuarioEliminar.rowCount === 0) throw new Error("El usuario no existe");
        const result = await pool.query("DELETE FROM usuarios WHERE usuarioId=$1", [usuarioId]);
        return { message: "Usuario eliminado correctamente", usuario: usuarioEliminar.rows[0] };
};
