const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuraciones
app.use(cors());
app.use(express.json());

// Rutas de cursos
const cursoRoutes = require('./routes/cursoRoutes');

app.use('/api/cursos', cursoRoutes);

// Iniciar servidor
if (require.main === module) {
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
        console.log(`Microservicio de Cursos funcionando en http://localhost:${PORT}`);
    });
}

// Exportar aplicación para pruebas
module.exports = app;
