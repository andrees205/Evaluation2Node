import { Router } from "express";

import * as usersController from "../controllers/usersController.js";
import { runValidations, createUserValidators } from "../Middlewares/validators.js";


const router = Router();

router.get('/', usersController.getAllUsers);
router.get("/apellido/:apellido", usersController.getUsuariosPorApellido);
router.get("/rol/:rolId", usersController.getUsuariosPorRol);

router.post('/', usersController.createUser, runValidations(createUserValidators));

router.put('/:id_usuario', usersController.updateUser);

router.delete('/:id_usuario', usersController.deleteUser);


export default router;