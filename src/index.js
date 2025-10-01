import express from 'express';

import comentarioRoutes from './routes/comentarioRoutes.js';

import dotenv from 'dotenv';
dotenv.config();
const app = express();

//Middleware para parsear JSON en las peticiones
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola, mundo');
});


app.use('/comentarios', comentarioRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});