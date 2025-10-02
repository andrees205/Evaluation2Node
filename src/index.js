import express from 'express';

import comentarioRoutes from './routes/comentarioRoutes.js';

import userRoutes from './routes/usersRoutes.js';

import calificacionesRoutes from './routes/calificacionRoutes.js';

import userRoutes from './routes/usersRoutes.js';
import dotenv from 'dotenv';
import { errorHandler } from './Middlewares/errorHandler.js';
dotenv.config();
const app = express();

import { runValidations, createUserValidators } from './Middlewares/validators.js';
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola, mundo');
});

app.use('/comentarios', comentarioRoutes);

app.use('/calificaciones', calificacionesRoutes);

app.use('/users', userRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});