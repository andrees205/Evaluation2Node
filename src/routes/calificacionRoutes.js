import { Router } from "express";
import * as calificacionControllers from "../controllers/calificacionController.js";

const router = Router();

import { runValidations, createCalificacionValidators } from "../Middlewares/validators.js";
//todas las calificaciones
router.get("/", calificacionControllers.getAllCalificaciones);

//calificaciones por id de publicación
router.get("/publicacion/:publicacionId", calificacionControllers.getCalificacionesByPublicacion);

router.post("/", calificacionControllers.postCrearCalificacion, runValidations(createCalificacionValidators ));

router.put("/:calificacionId", calificacionControllers.putActualizarCalificacion);

router.delete("/:calificacionId", calificacionControllers.eliminarCalificacion);

export default router;
