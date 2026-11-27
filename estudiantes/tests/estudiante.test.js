
const request = require('supertest');
const app = require('../server');
const pool = require('../config/database');

// Datos únicos para evitar duplicados al repetir las pruebas
const codigoPrueba = `AUTO${Date.now()}`;
const correoPrueba = `auto${Date.now()}@test.com`;

let estudianteId;

describe('Pruebas automatizadas del módulo de estudiantes', () => {

    // PRUEBA 1: Listar estudiantes
    test('Debe listar todos los estudiantes', async () => {
        const respuesta = await request(app)
            .get('/api/estudiantes');

        expect(respuesta.statusCode).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });

    // PRUEBA 2: Buscar estudiante existente
    test('Debe encontrar un estudiante por su ID', async () => {
        const respuesta = await request(app)
            .get('/api/estudiantes/1');

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body).toHaveProperty('id', 1);
    });

    // PRUEBA 3: Buscar estudiante inexistente
    test('Debe devolver 404 si el estudiante no existe', async () => {
        const respuesta = await request(app)
            .get('/api/estudiantes/999');

        expect(respuesta.statusCode).toBe(404);
        expect(respuesta.body.mensaje).toBe('Estudiante no encontrado.');
    });

    // PRUEBA 4: Rechazar campos vacíos
    test('Debe rechazar el registro si faltan campos', async () => {
        const respuesta = await request(app)
            .post('/api/estudiantes')
            .send({
                codigo: 'TEST001',
                nombres: 'Pedro',
                apellidos: '',
                correo: 'pedro@test.com',
                carrera: 'Ingenieria de Sistemas'
            });

        expect(respuesta.statusCode).toBe(400);
    });

    // PRUEBA 5: Rechazar correo inválido
    test('Debe rechazar un correo electrónico inválido', async () => {
        const respuesta = await request(app)
            .post('/api/estudiantes')
            .send({
                codigo: 'TEST002',
                nombres: 'Pedro',
                apellidos: 'Ramirez Soto',
                correo: 'correo-invalido',
                carrera: 'Ingenieria de Sistemas'
            });

        expect(respuesta.statusCode).toBe(400);
    });

    // PRUEBA 6: Registrar estudiante correctamente
    test('Debe registrar un estudiante correctamente', async () => {
        const respuesta = await request(app)
            .post('/api/estudiantes')
            .send({
                codigo: codigoPrueba,
                nombres: 'Estudiante',
                apellidos: 'Prueba Automatizada',
                correo: correoPrueba,
                carrera: 'Ingenieria de Sistemas'
            });

        expect(respuesta.statusCode).toBe(201);
        expect(respuesta.body.mensaje).toBe(
            'Estudiante registrado correctamente.'
        );

        estudianteId = respuesta.body.resultado;

        expect(estudianteId).toBeDefined();
    });

    // PRUEBA 7: Rechazar código duplicado
    test('Debe rechazar un código de estudiante duplicado', async () => {
        const respuesta = await request(app)
            .post('/api/estudiantes')
            .send({
                codigo: 'EST001',
                nombres: 'Pedro',
                apellidos: 'Ramirez Soto',
                correo: `duplicado${Date.now()}@test.com`,
                carrera: 'Ingenieria de Sistemas'
            });

        expect(respuesta.statusCode).toBe(409);
    });

    // PRUEBA 8: Actualizar estudiante
    test('Debe actualizar un estudiante correctamente', async () => {
        const respuesta = await request(app)
            .put(`/api/estudiantes/${estudianteId}`)
            .send({
                codigo: codigoPrueba,
                nombres: 'Estudiante',
                apellidos: 'Actualizado',
                correo: correoPrueba,
                carrera: 'Ingenieria de Sistemas e Informatica'
            });

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Estudiante actualizado correctamente.'
        );
    });

    // PRUEBA 9: Rechazar actualización de ID inexistente
    test('Debe rechazar la actualización de un estudiante inexistente', async () => {
        const respuesta = await request(app)
            .put('/api/estudiantes/999')
            .send({
                codigo: 'EST999',
                nombres: 'Pedro',
                apellidos: 'Ramirez Soto',
                correo: 'pedro999@test.com',
                carrera: 'Ingenieria de Sistemas'
            });

        expect(respuesta.statusCode).toBe(404);
    });

    // PRUEBA 10: Eliminar estudiante
    test('Debe eliminar un estudiante correctamente', async () => {
        const respuesta = await request(app)
            .delete(`/api/estudiantes/${estudianteId}`);

        expect(respuesta.statusCode).toBe(200);
        expect(respuesta.body.mensaje).toBe(
            'Estudiante eliminado correctamente.'
        );
    });

    // PRUEBA 11: Verificar que fue eliminado
    test('Debe devolver 404 al buscar el estudiante eliminado', async () => {
        const respuesta = await request(app)
            .get(`/api/estudiantes/${estudianteId}`);

        expect(respuesta.statusCode).toBe(404);
    });

    // CERRAR CONEXIÓN CON MYSQL
    afterAll(async () => {
        await pool.end();
    });

});
