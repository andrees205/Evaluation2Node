import { pool } from '../db.js';

export const obtenerUsuarios = async () => {
        const result = await pool.query('SELECT * FROM usuarios');
        return result.rows;
};

export const obtenerPorNombre = async (nombre) => {
    const buscar = `%${nombre}%`;
    const result = await pool.query(
        "SELECT * FROM usuarios WHERE nombre ILIKE $1 OR apellido ILIKE $1",
        [buscar]
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

export const actualizarUsuario = async (usuario) => {
    const { usuarioId, rolId, nombreUsuario, clave, nombre, apellido } = usuario;
    const query = `UPDATE usuarios
                   SET rolId=$1, nombreUsuario=$2, clave=$3, nombre=$4, apellido=$5
                   WHERE usuarioId=$6
                   RETURNING *;`;

        const result = await pool.query(query, [rolId, nombreUsuario, clave, nombre, apellido, usuarioId]);
        if (result.rowCount === 0) throw new Error("Usuario no encontrado");
        return result.rows[0];
};

export const eliminarUsuario = async (usuarioId) => {
    
        const usuarioEliminar = await pool.query("SELECT * FROM usuarios WHERE usuarioId=$1", [usuarioId]);
        if (usuarioEliminar.rowCount === 0) throw new Error("El usuario no existe");
        const result = await pool.query("DELETE FROM usuarios WHERE usuarioId=$1", [usuarioId]);
        return { message: "Usuario eliminado correctamente", usuario: usuarioEliminar.rows[0] };
};
