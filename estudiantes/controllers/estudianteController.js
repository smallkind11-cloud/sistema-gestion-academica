
const estudianteModel = require('../models/estudianteModel');

// Validar ID
const validarId = (id) => /^[1-9]\d*$/.test(id);

// Validar nombres y apellidos
const patronNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s'-]+$/;

// Validar correo
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validar datos del estudiante
const validarDatos = (datos) => {
    const { codigo, nombres, apellidos, correo, carrera } = datos;

    if (
        codigo == null ||
        nombres == null ||
        apellidos == null ||
        correo == null ||
        carrera == null
    ) {
        return 'Todos los campos son obligatorios.';
    }

    const valores = [codigo, nombres, apellidos, correo, carrera];

    if (valores.some(valor => typeof valor !== 'string' || !valor.trim())) {
        return 'No se permiten campos vacíos y todos los campos deben ser texto.';
    }

    if (!patronNombre.test(nombres.trim()) ||
        !patronNombre.test(apellidos.trim())) {
        return 'Los nombres y apellidos no deben contener números ni símbolos inválidos.';
    }

    if (!patronCorreo.test(correo.trim())) {
        return 'El correo electrónico no tiene un formato válido.';
    }

    return null;
};

// Normalizar datos
const normalizarDatos = (datos) => ({
    codigo: datos.codigo.trim(),
    nombres: datos.nombres.trim(),
    apellidos: datos.apellidos.trim(),
    correo: datos.correo.trim().toLowerCase(),
    carrera: datos.carrera.trim()
});


// ==========================================
// 1. LISTAR ESTUDIANTES
// ==========================================
const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await estudianteModel.listarEstudiantes();

        return res.status(200).json(estudiantes);

    } catch (error) {
        console.error('Error al listar:', error);

        return res.status(500).json({
            mensaje: 'Error interno al listar estudiantes.'
        });
    }
};


// ==========================================
// 2. BUSCAR ESTUDIANTE
// ==========================================
const buscarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;

        if (!validarId(id)) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo.'
            });
        }

        const estudiante = await estudianteModel.buscarEstudiante(id);

        if (!estudiante) {
            return res.status(404).json({
                mensaje: 'Estudiante no encontrado.'
            });
        }

        return res.status(200).json(estudiante);

    } catch (error) {
        console.error('Error al buscar:', error);

        return res.status(500).json({
            mensaje: 'Error interno al buscar estudiante.'
        });
    }
};


// ==========================================
// 3. REGISTRAR ESTUDIANTE
// ==========================================
const registrarEstudiante = async (req, res) => {
    try {
        const errorValidacion = validarDatos(req.body);

        if (errorValidacion) {
            return res.status(400).json({
                mensaje: errorValidacion
            });
        }

        const datos = normalizarDatos(req.body);

        const resultado = await estudianteModel.registrarEstudiante(datos);

        return res.status(201).json({
            mensaje: 'Estudiante registrado correctamente.',
            resultado
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El código o correo electrónico ya está registrado.'
            });
        }

        console.error('Error al registrar:', error);

        return res.status(500).json({
            mensaje: 'Error interno al registrar estudiante.'
        });
    }
};


// ==========================================
// 4. ACTUALIZAR ESTUDIANTE
// ==========================================
const actualizarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;

        if (!validarId(id)) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo.'
            });
        }

        const errorValidacion = validarDatos(req.body);

        if (errorValidacion) {
            return res.status(400).json({
                mensaje: errorValidacion
            });
        }

        const estudianteExistente = await estudianteModel.buscarEstudiante(id);

        if (!estudianteExistente) {
            return res.status(404).json({
                mensaje: 'Estudiante no encontrado.'
            });
        }

        const datos = normalizarDatos(req.body);

        await estudianteModel.actualizarEstudiante(id, datos);

        return res.status(200).json({
            mensaje: 'Estudiante actualizado correctamente.'
        });

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensaje: 'El código o correo electrónico ya está registrado por otro estudiante.'
            });
        }

        console.error('Error al actualizar:', error);

        return res.status(500).json({
            mensaje: 'Error interno al actualizar estudiante.'
        });
    }
};


// ==========================================
// 5. ELIMINAR ESTUDIANTE
// ==========================================
const eliminarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;

        if (!validarId(id)) {
            return res.status(400).json({
                mensaje: 'El ID debe ser un número entero positivo.'
            });
        }

        const estudiante = await estudianteModel.buscarEstudiante(id);

        if (!estudiante) {
            return res.status(404).json({
                mensaje: 'Estudiante no encontrado.'
            });
        }

        await estudianteModel.eliminarEstudiante(id);

        return res.status(200).json({
            mensaje: 'Estudiante eliminado correctamente.'
        });

    } catch (error) {
        console.error('Error al eliminar:', error);

        return res.status(500).json({
            mensaje: 'Error interno al eliminar estudiante.'
        });
    }
};


// ==========================================
// EXPORTAR CONTROLADORES
// ==========================================
module.exports = {
    listarEstudiantes,
    buscarEstudiante,
    registrarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};
