const express = require('express');
const router = express.Router();

const estudianteController = require('../controllers/estudianteController');

router.get('/', estudianteController.listarEstudiantes);
router.get('/:id', estudianteController.buscarEstudiante);
router.post('/', estudianteController.registrarEstudiante);
router.put('/:id', estudianteController.actualizarEstudiante);
router.delete('/:id', estudianteController.eliminarEstudiante);

module.exports = router;
