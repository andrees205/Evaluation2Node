import { Router } from "express";

import * as comentariosControllers from "../controllers/comentarioController.js";

const router = Router();

//todos los comentarios
router.get("/", comentariosControllers.getAllComentarios);

//comentarios por id de publicación
router.get("/publicacion/:publicacionId", comentariosControllers.getComentariosByPublicacion);

//comentarios por id usuario
router.get("/usuario/:usuarioId", comentariosControllers.getComentariosByUsuario);

//crear un comentario
router.post("/", comentariosControllers.postCrearComentario);

//actualizar un comentario
router.put("/:comentarioId", comentariosControllers.putActualizarComentario);

//eliminar un comentario
router.delete("/:comentarioId", comentariosControllers.eliminarComentario);

export default router;
