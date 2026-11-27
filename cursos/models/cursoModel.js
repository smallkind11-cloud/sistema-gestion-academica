const pool = require('../config/database');

// Listar todos los cursos
const listarCursos = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM cursos ORDER BY id'
    );
    return rows;
};

// Buscar curso por ID
const buscarCurso = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM cursos WHERE id = ?',
        [id]
    );
    return rows[0];
};

// Registrar curso
const registrarCurso = async (curso) => {
    const {
        codigo,
        nombre,
        descripcion,
        creditos,
        docente
    } = curso;

    const [resultado] = await pool.query(
        `INSERT INTO cursos
        (codigo, nombre, descripcion, creditos, docente)
        VALUES (?, ?, ?, ?, ?)`,
        [codigo, nombre, descripcion || null, creditos, docente]
    );

    return resultado.insertId;
};

// Actualizar curso
const actualizarCurso = async (id, curso) => {
    const {
        codigo,
        nombre,
        descripcion,
        creditos,
        docente,
        estado
    } = curso;

    const [resultado] = await pool.query(
        `UPDATE cursos
        SET codigo = ?, nombre = ?, descripcion = ?,
            creditos = ?, docente = ?, estado = ?
        WHERE id = ?`,
        [codigo, nombre, descripcion || null, creditos, docente, estado, id]
    );

    return resultado.affectedRows;
};

// Eliminar curso
const eliminarCurso = async (id) => {
    const [resultado] = await pool.query(
        'DELETE FROM cursos WHERE id = ?',
        [id]
    );

    return resultado.affectedRows;
};

module.exports = {
    listarCursos,
    buscarCurso,
    registrarCurso,
    actualizarCurso,
    eliminarCurso
};
