const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuraciones
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Rutas de estudiantes
const estudianteRoutes = require('./routes/estudianteRoutes');

app.use('/api/estudiantes', estudianteRoutes);

// Ruta principal

// Iniciar servidor
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor funcionando en http://localhost:${PORT}`);
    });
}

// Exportar aplicación para pruebas
module.exports = app;
