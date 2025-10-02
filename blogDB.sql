
CREATE DATABASE blogDB;


CREATE TABLE roles (
    rolId SERIAL PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);


CREATE TABLE usuarios (
    usuarioId SERIAL PRIMARY KEY,
    rolId INT NOT NULL,
    nombreUsuario VARCHAR(50) UNIQUE NOT NULL,
    clave VARCHAR(100) NOT NULL,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rolId) REFERENCES roles(rolId)
);


CREATE TABLE publicaciones (
    publicacionId SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    usuarioId INT NOT NULL,
    CONSTRAINT fk_publicacion_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(usuarioId)
);


CREATE TABLE comentarios (
    comentarioId SERIAL PRIMARY KEY,
    publicacionId INT NOT NULL,
    comentario TEXT NOT NULL,
    usuarioId INT NOT NULL,
    CONSTRAINT fk_comentario_publicacion FOREIGN KEY (publicacionId) REFERENCES publicaciones(publicacionId),
    CONSTRAINT fk_comentario_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(usuarioId)
);


CREATE TABLE calificaciones (
    calificacionId SERIAL PRIMARY KEY,
    publicacionId INT NOT NULL,
    usuarioId INT NOT NULL,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    CONSTRAINT fk_calificacion_publicacion FOREIGN KEY (publicacionId) REFERENCES publicaciones(publicacionId),
    CONSTRAINT fk_calificacion_usuario FOREIGN KEY (usuarioId) REFERENCES usuarios(usuarioId)
);

INSERT INTO roles (rol) VALUES
('Administrador'),
('Usuario');

INSERT INTO usuarios (rolId, nombreUsuario, clave, nombre, apellido) VALUES
(1, 'admin1', 'clave123', 'Carlos', 'Pérez'),
(1, 'mod_julia', 'clave456', 'Julia', 'Ramírez'),
(2, 'user_mario', 'clave789', 'Mario', 'Gómez'),
(2, 'editor_ana', 'clave321', 'Ana', 'López'),
(2, 'guest_luisa', 'clave654', 'Luisa', 'Martínez');

INSERT INTO publicaciones (titulo, descripcion, usuarioId) VALUES
('Primer post', 'Esta es la primera publicación.', 1),
('Noticias de tecnología', 'Últimas novedades en tecnología.', 2),
('Mi receta favorita', 'Receta de pasta con salsa especial.', 3),
('Tutorial de dibujo', 'Paso a paso para dibujar retratos.', 4),
('Tips de viaje', 'Consejos para viajar barato y seguro.', 5),
('Viaje a la playa', 'Compartiendo mis experiencias en la playa.', 1),
('Reseña de libro', 'Opinión sobre mi libro favorito.', 2),
('Receta de ensalada', 'Ensalada fresca para el verano.', 3),
('Curso de fotografía', 'Aprendiendo fotografía paso a paso.', 4),
('Destinos económicos', 'Lugares para viajar sin gastar mucho.', 5),
('Mantenimiento de jardín', 'Tips para mantener tu jardín bonito.', 1),
('Noticias deportivas', 'Últimos resultados y noticias.', 2),
('Postre saludable', 'Receta de postre sin azúcar.', 3),
('Ilustraciones digitales', 'Compartiendo mis ilustraciones.', 4),
('Guía de mochilero', 'Cómo preparar tu mochila para viajar.', 5);


INSERT INTO comentarios (publicacionId, comentario, usuarioId) VALUES
(1, '¡Excelente post!', 3),
(2, 'Muy útil la información, gracias.', 4),
(3, 'Probaré esta receta el fin de semana.', 5),
(4, 'Gran tutorial, me ayudó mucho.', 2),
(5, 'Tomaré en cuenta estos tips.', 1),
(6, '¡Qué envidia! Me encantaría ir también.', 2),
(6, 'Muy buenos tips, gracias por compartir.', 3),
(7, 'Excelente reseña, coincido contigo.', 5),
(7, 'Me motivaste a leer ese libro.', 1),
(8, 'Probaré esta ensalada mañana.', 4),
(8, 'Se ve muy saludable y fácil de hacer.', 2),
(9, 'Tus ilustraciones son impresionantes.', 5),
(9, 'Qué estilo tan único, me gusta mucho.', 3),
(10, 'Muy útil la guía, me servirá para mi viaje.', 1),
(10, 'Gracias por los consejos, muy completo.', 4),
(11, 'Me encanta la jardinería, aplicaré estos tips.', 5),
(11, 'Gracias por compartir tus secretos del jardín.', 2),
(12, 'Interesante resumen de noticias deportivas.', 1),
(12, 'Muy informativo, gracias por publicar.', 3),
(13, 'Probaré ese postre este fin de semana.', 4),
(13, 'Se ve delicioso y saludable.', 5),
(14, 'Tus ilustraciones digitales son muy inspiradoras.', 2),
(14, 'Gracias por compartir tu trabajo.', 1),
(15, 'Muy útil la guía para mochileros.', 3),
(15, 'Me ayudará a planificar mi próximo viaje.', 4)
(15, 'adaasff', 4),
(15, 'fgfgsff', 4),
(11, 'holaa', 4),
(12, 'muy buen consejo', 4);


INSERT INTO calificaciones (publicacionId, usuarioId, calificacion) VALUES
(1, 2, 5),
(2, 3, 4),
(3, 1, 5),
(4, 5, 3),
(5, 4, 4);


