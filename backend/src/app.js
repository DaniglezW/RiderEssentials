const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); // Importar el pool desde db.js

const app = express();

app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:4200', 'http://localhost'];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Middleware para añadir la conexión de MySQL a cada solicitud
app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Importar y usar las rutas
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

module.exports = app;
