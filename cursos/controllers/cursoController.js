const cursoModel = require('../models/cursoModel');

// Listar cursos
const listarCursos = async (req, res) => {
    try {
        const cursos = await cursoModel.listarCursos();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar los cursos.',
            error: error.message
        });
    }
};

// Buscar curso por ID
const buscarCurso = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await cursoModel.buscarCurso(id);

        if (!curso) {
            return res.status(404).json({
                mensaje: 'Curso no encontrado.'
            });
        }

        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar el curso.',
            error: error.message
        });
    }
};

// Registrar curso
const registrarCurso = async (req, res) => {
    try {
        const { codigo, nombre, creditos, docente } = req.body;

        if (
            !codigo?.trim() ||
            !nombre?.trim() ||
            creditos === undefined ||
            creditos === null ||
            !docente?.trim()
        ) {
            return res.status(400).json({
                mensaje: 'Los campos código, nombre, créditos y docente son obligatorios.'
            });
        }

        if (
            !Number.isInteger(Number(creditos)) ||
            Number(creditos) <= 0
        ) {
            return res.status(400).json({
                mensaje: 'Los créditos deben ser un número entero positivo.'
            });
        }

        const id = await cursoModel.registrarCurso(req.body);

        res.status(201).json({
            mensaje: 'Curso registrado correctamente.',
            resultado: id
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El código del curso ya está registrado.'
            });
        }

        res.status(500).json({
            mensaje: 'Error al registrar el curso.',
            error: error.message
        });
    }
};

// Actualizar curso
const actualizarCurso = async (req, res) => {
    try {
        const { codigo, nombre, creditos, docente, estado } = req.body;

        if (
            !codigo?.trim() ||
            !nombre?.trim() ||
            creditos === undefined ||
            creditos === null ||
            !docente?.trim() ||
            !['Activo', 'Inactivo'].includes(estado)
        ) {
            return res.status(400).json({
                mensaje: 'Verifique los campos obligatorios y el estado del curso.'
            });
        }

        if (
            !Number.isInteger(Number(creditos)) ||
            Number(creditos) <= 0
        ) {
            return res.status(400).json({
                mensaje: 'Los créditos deben ser un número entero positivo.'
            });
        }

        const resultado = await cursoModel.actualizarCurso(
            req.params.id,
            req.body
        );

        if (resultado === 0) {
            const curso = await cursoModel.buscarCurso(req.params.id);

            if (!curso) {
                return res.status(404).json({
                    mensaje: 'Curso no encontrado.'
                });
            }
        }

        res.status(200).json({
            mensaje: 'Curso actualizado correctamente.'
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El código del curso ya está registrado.'
            });
        }

        res.status(500).json({
            mensaje: 'Error al actualizar el curso.',
            error: error.message
        });
    }
};

// Eliminar curso
const eliminarCurso = async (req, res) => {
    try {
        const resultado = await cursoModel.eliminarCurso(req.params.id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Curso no encontrado.'
            });
        }

        res.status(200).json({
            mensaje: 'Curso eliminado correctamente.'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el curso.',
            error: error.message
        });
    }
};

module.exports = {
    listarCursos,
    buscarCurso,
    registrarCurso,
    actualizarCurso,
    eliminarCurso
};
