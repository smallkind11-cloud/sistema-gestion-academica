require('dotenv').config();
const pool = require('./config/database');

async function probarConexion() {
    try {
        const conexion = await pool.getConnection();
        console.log('¡Conexión exitosa con MySQL!');
        console.log('Base de datos:', process.env.DB_NAME);
        conexion.release();
    } catch (error) {
        console.error('Error de conexión:', error.message);
    } finally {
        await pool.end();
    }
}

probarConexion();
