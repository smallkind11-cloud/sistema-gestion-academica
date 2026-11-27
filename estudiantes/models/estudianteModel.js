
const pool = require('../config/database');

// Listar todos los estudiantes
const listarEstudiantes = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM estudiantes ORDER BY id'
    );
    return rows;
};

// Buscar estudiante por ID
const buscarEstudiante = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM estudiantes WHERE id = ?',
        [id]
    );
    return rows[0];
};

// Registrar estudiante
const registrarEstudiante = async (estudiante) => {
    const { codigo, nombres, apellidos, correo, carrera } = estudiante;

    const [resultado] = await pool.query(
        `INSERT INTO estudiantes
        (codigo, nombres, apellidos, correo, carrera)
        VALUES (?, ?, ?, ?, ?)`,
        [codigo, nombres, apellidos, correo, carrera]
    );

    return resultado.insertId;
};

// Actualizar estudiante
const actualizarEstudiante = async (id, estudiante) => {
    const { codigo, nombres, apellidos, correo, carrera } = estudiante;

    const [resultado] = await pool.query(
        `UPDATE estudiantes
        SET codigo = ?, nombres = ?, apellidos = ?, correo = ?, carrera = ?
        WHERE id = ?`,
        [codigo, nombres, apellidos, correo, carrera, id]
    );

    return resultado.affectedRows;
};

// Eliminar estudiante
const eliminarEstudiante = async (id) => {
    const [resultado] = await pool.query(
        'DELETE FROM estudiantes WHERE id = ?',
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    listarEstudiantes,
    buscarEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
