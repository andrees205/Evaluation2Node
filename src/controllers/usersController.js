import * as userService from "../services/userServices.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const usuarios = await userService.obtenerUsuarios();
        res.json(usuarios);
    } catch (err) {
        return next(err);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;
        const newUser = await userService.crearUsuario(rolId, nombreUsuario, clave, nombre, apellido);
        res.status(201).json(newUser);
    } catch (err) {
        return next(err);
    }
};

export const updateUser = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        const { rolId, nombreUsuario, clave, nombre, apellido } = req.body;
        const updatedUser = await userService.actualizarUsuario({ usuarioId, rolId, nombreUsuario, clave, nombre, apellido });

        if (!updatedUser) {
            throw new Error("Usuario no encontrado");
        }

        res.status(200).json({
            message: "Usuario actualizado correctamente",
            usuario: updatedUser
        });
    } catch (err) {
        return next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const { usuarioId } = req.params;
        const result = await userService.eliminarUsuario(usuarioId);
        res.status(200).json(result);
    } catch (err) {
        return next(err);
    }
};
