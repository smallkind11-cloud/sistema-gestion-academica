const request = require('supertest');
const app = require('../server');
const pool = require('../config/database');

describe('Pruebas del microservicio de cursos', () => {

    let cursoId;

    const curso = {
        codigo: `CURTEST${Date.now()}`,
        nombre: 'Curso de prueba',
        descripcion: 'Prueba automatizada del microservicio',
        creditos: 4,
        docente: 'Docente de prueba',
        estado: 'Activo'
    };

    // Prueba 1: Registrar un curso
    test('Debe registrar un curso correctamente', async () => {
        const respuesta = await request(app)
            .post('/api/cursos')
            .send(curso);

        expect([200, 201]).toContain(respuesta.statusCode);
        expect(respuesta.body.mensaje).toBe('Curso registrado correctamente.');

        cursoId = respuesta.body.resultado;
        expect(cursoId).toBeDefined();
    });

    // Prueba 2: Listar todos los cursos
    test('Debe listar todos los cursos', async () => {
        const respuesta = await request(app)
            .get('/api/cursos');

        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });

    // Prueba 3: Buscar un curso por ID
    test('Debe buscar un curso por su ID', async () => {
        const respuesta = await request(app)
            .get(`/api/cursos/${cursoId}`);

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.id).toBe(cursoId);
        expect(respuesta.body.codigo).toBe(curso.codigo);
    });

    // Prueba 4: Actualizar un curso
    test('Debe actualizar un curso correctamente', async () => {
        const datosActualizados = {
            ...curso,
            nombre: 'Curso actualizado',
            creditos: 5
        };

        const respuesta = await request(app)
            .put(`/api/cursos/${cursoId}`)
            .send(datosActualizados);

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.mensaje).toBe('Curso actualizado correctamente.');
    });

    // Prueba 5: Rechazar un curso inexistente
    test('Debe devolver 404 si el curso no existe', async () => {
        const respuesta = await request(app)
            .get('/api/cursos/999999');

        expect(respuesta.statusCode).toBe(404);
    });

    // Prueba 6: Eliminar un curso
    test('Debe eliminar un curso correctamente', async () => {
        const respuesta = await request(app)
            .delete(`/api/cursos/${cursoId}`);

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.mensaje).toBe('Curso eliminado correctamente.');
    });

    // Cerrar la conexión a MySQL al terminar
    afterAll(async () => {
        await pool.end();
    });

});
