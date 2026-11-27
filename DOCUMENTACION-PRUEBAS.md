# DOCUMENTACIÓN DE PRUEBAS
## Sistema de Gestión Académica

### 1. Objetivo

Verificar el correcto funcionamiento de los microservicios de Estudiantes y Cursos mediante pruebas automatizadas, comprobando las operaciones principales de sus APIs REST.

### 2. Herramientas utilizadas

- **Jest:** framework para ejecutar las pruebas automatizadas.
- **Supertest:** herramienta para realizar solicitudes HTTP a las APIs durante las pruebas.
- **Node.js:** entorno de ejecución de JavaScript.
- **MySQL:** sistema de gestión de bases de datos.

### 3. Pruebas del microservicio de Estudiantes

**Archivo:** `estudiantes/tests/estudiante.test.js`

Se implementaron 11 pruebas automatizadas:

| N.º | Prueba | Resultado |
|---|---|---|
| 1 | Listar estudiantes | Aprobada |
| 2 | Buscar estudiante por ID | Aprobada |
| 3 | Buscar estudiante inexistente | Aprobada |
| 4 | Rechazar registro con campos obligatorios faltantes | Aprobada |
| 5 | Rechazar correo electrónico inválido | Aprobada |
| 6 | Registrar estudiante correctamente | Aprobada |
| 7 | Rechazar código duplicado | Aprobada |
| 8 | Actualizar estudiante | Aprobada |
| 9 | Actualizar estudiante inexistente | Aprobada |
| 10 | Eliminar estudiante | Aprobada |
| 11 | Verificar que el estudiante eliminado ya no existe | Aprobada |

**Resultado:** 11 de 11 pruebas aprobadas.

Para ejecutar las pruebas:

```bash
cd estudiantes
npm test
```

### 4. Pruebas del microservicio de Cursos

**Archivo:** `cursos/tests/curso.test.js`

Se implementaron 6 pruebas automatizadas:

| N.º | Prueba | Resultado |
|---|---|---|
| 1 | Registrar curso | Aprobada |
| 2 | Listar cursos | Aprobada |
| 3 | Buscar curso por ID | Aprobada |
| 4 | Actualizar curso | Aprobada |
| 5 | Buscar curso inexistente | Aprobada |
| 6 | Eliminar curso | Aprobada |

**Resultado:** 6 de 6 pruebas aprobadas.

Para ejecutar las pruebas:

```bash
cd cursos
npm test
```

### 5. Resultados generales

| Microservicio | Pruebas ejecutadas | Aprobadas |
|---|---:|---:|
| Estudiantes | 11 | 11 |
| Cursos | 6 | 6 |
| **Total** | **17** | **17** |

Las pruebas automatizadas ejecutadas finalizaron satisfactoriamente.

### 6. API Gateway

El API Gateway permite centralizar las solicitudes y dirigirlas a los microservicios correspondientes.

- Estudiantes: `http://localhost:3000`
- Cursos: `http://localhost:3001`
- API Gateway: `http://localhost:4000`

Las rutas principales del Gateway son:

- `/api/estudiantes`
- `/api/cursos`

### 7. Conclusión

Las pruebas automatizadas permitieron verificar las operaciones principales de registro, consulta, actualización y eliminación de estudiantes y cursos.

Se obtuvieron 17 pruebas aprobadas de un total de 17 ejecutadas en ambos microservicios, comprobando el funcionamiento de las operaciones implementadas.
