import express from 'express';

import comentarioRoutes from './routes/comentarioRoutes.js';
import calificacionesRoutes from './routes/calificacionRoutes.js';

import dotenv from 'dotenv';
dotenv.config();
const app = express();

//Middleware para parsear JSON en las peticiones
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola, mundo');
});


app.use('/comentarios', comentarioRoutes);
app.use('/calificaciones', calificacionesRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});