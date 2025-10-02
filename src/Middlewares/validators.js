import { body, validationResult } from "express-validator";

export const runValidations = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  };
};

export const createUserValidators = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),
  body("clave")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const createCalificacionValidators = [
  body("publicacionId")
    .notEmpty()
    .withMessage("El ID de la publicación es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El ID de la publicación debe ser un número entero positivo"),
  
  body("usuarioId")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El ID del usuario debe ser un número entero positivo"),

  body("calificacion")
    .notEmpty()
    .withMessage("La calificación es obligatoria")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificación debe ser un número entre 1 y 5"),
];

export const createComentarioValidators = [
  body("publicacionId")
    .notEmpty()
    .withMessage("El ID de la publicación es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El ID de la publicación debe ser un número entero positivo"),

  body("usuarioId")
    .notEmpty()
    .withMessage("El ID del usuario es obligatorio")
    .isInt({ gt: 0 })
    .withMessage("El ID del usuario debe ser un número entero positivo"),

  body("comentario")
    .trim()
    .notEmpty()
    .withMessage("El comentario no puede estar vacío")
];