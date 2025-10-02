import { Router } from "express";
import * as calificacionControllers from "../controllers/calificacionController.js";

const router = Router();

//todas las calificaciones
router.get("/", calificacionControllers.getAllCalificaciones);

//calificaciones por id de publicación
router.get("/publicacion/:publicacionId", calificacionControllers.getCalificacionesByPublicacion);

router.post("/", calificacionControllers.postCrearCalificacion);

router.put("/:calificacionId", calificacionControllers.putActualizarCalificacion);

router.delete("/:calificacionId", calificacionControllers.eliminarCalificacion);

export default router;
