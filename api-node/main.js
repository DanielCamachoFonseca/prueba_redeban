// server.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Cargar las variables de entorno
dotenv.config();

// Configuración de Express
const app = express();
const port = 3000;

// Middleware para analizar los datos JSON
app.use(bodyParser.json());

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  // Endpoint para recibir datos y guardarlos en PostgreSQL
app.post('/registro', async (req, res) => {
    const { nombre, edad } = req.body;

    // Validar los datos recibidos
  if (!nombre || !edad) {
    return res.status(400).json({ error: process.env.DATA_REQUIRED });
  }

  try {
    // Insertar datos en la base de datos
    const result = await pool.query('INSERT INTO registros (nombre, edad) VALUES ($1, $2) RETURNING *', [nombre, edad]);
    
    // Devolver los datos insertados
    res.status(201).json({
      message: process.env.MESSAGE_SUCCESS,
      data: result.rows[0],
    });
  } catch (err) {
    console.error(process.env.MESSAGE_ERROR, err);
    res.status(500).json({ error: process.env.MESSAGE_ERROR });
  }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });