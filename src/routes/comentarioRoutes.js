import { Router } from "express";

import * as comentariosControllers from "../controllers/comentarioController.js";

import { runValidations, createComentarioValidators } from "../Middlewares/validators.js";

const router = Router();

router.get("/", comentariosControllers.getAllComentarios);

router.get("/publicacion/:publicacionId", comentariosControllers.getComentariosByPublicacion);

router.get("/usuario/:usuarioId", comentariosControllers.getComentariosByUsuario);

router.post("/", comentariosControllers.postCrearComentario, runValidations(createComentarioValidators));

router.put("/:comentarioId", comentariosControllers.putActualizarComentario);

router.delete("/:comentarioId", comentariosControllers.eliminarComentario);

router.get("/top/:n", comentariosControllers.getTopUsuarios)

export default router;
