const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Permitir la comunicación con el navegador
app.use(cors());
app.use(express.json());

// =====================================
// MICRO SERVICIO DE ESTUDIANTES
// =====================================
app.use(
    '/api/estudiantes',
    createProxyMiddleware({
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: (path) => '/api/estudiantes' + path
    })
);

// =====================================
// MICRO SERVICIO DE CURSOS
// =====================================
app.use(
    '/api/cursos',
    createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: (path) => '/api/cursos' + path
    })
);

// =====================================
// RUTA PRINCIPAL DEL GATEWAY
// =====================================
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Gateway del Sistema de Gestión Académica',
        servicios: {
            estudiantes: '/api/estudiantes',
            cursos: '/api/cursos'
        }
    });
});

// =====================================
// INICIAR SERVIDOR
// =====================================
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`API Gateway funcionando en http://localhost:${PORT}`);
});
