const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');


// Cargar las variables de entorno
dotenv.config();

const app = express();
app.use(express.json());

// Configuración de la conexión a PostgreSQL usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Endpoint para reservar un ticket
app.post('/reservar', async (req, res) => {
  const { ticketId, usuario } = req.body;

  if (!ticketId || !usuario) {
    return res.status(400).json({ error: process.env.DATA_REQUIRED });
  }

  try {
    const result = await pool.query('SELECT reservar_ticket($1, $2) AS mensaje', [ticketId, usuario]);
    const mensaje = result.rows[0].mensaje;

    if (mensaje.includes(process.env.ERROR_TICKET_NOT_FOUND)) {
      res.status(409).json({ error: mensaje }); // Conflicto (HTTP 409)
    } else {
      res.json({ message: mensaje });
    }
  } catch (error) {
    console.error(process.env.MESSAGE_ERROR, error);
    res.status(500).json({ error: process.env.MESSAGE_ERROR });
  }
});

// Iniciar el servidor
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
