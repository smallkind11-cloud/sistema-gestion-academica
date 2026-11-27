
const express = require('express');
const router = express.Router();

const cursoController = require('../controllers/cursoController');

// Rutas del módulo de cursos
router.get('/', cursoController.listarCursos);
router.get('/:id', cursoController.buscarCurso);
router.post('/', cursoController.registrarCurso);
router.put('/:id', cursoController.actualizarCurso);
router.delete('/:id', cursoController.eliminarCurso);

module.exports = router;
