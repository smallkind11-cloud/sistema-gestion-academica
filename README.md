# Sistema de Gestión Académica

Sistema web desarrollado con arquitectura de microservicios para gestionar estudiantes y cursos académicos.

## 1. Descripción del proyecto

El Sistema de Gestión Académica permite administrar la información de estudiantes y cursos mediante servicios independientes que se comunican a través de APIs REST.

El proyecto está desarrollado con Node.js, Express y MySQL.

## 2. Arquitectura del sistema

El sistema está compuesto por tres componentes:

- **Microservicio de Estudiantes:** permite registrar, consultar, listar, actualizar y eliminar estudiantes.
- **Microservicio de Cursos:** permite registrar, consultar, listar, actualizar y eliminar cursos.
- **API Gateway:** centraliza las solicitudes y las dirige al microservicio correspondiente.

### Diagrama de arquitectura

```text
                 CLIENTE
                    |
                    v
             API GATEWAY
              Puerto 4000
                    |
           +--------+--------+
           |                 |
           v                 v
    MICROSERVICIO       MICROSERVICIO
    ESTUDIANTES         CURSOS
    Puerto 3000         Puerto 3001
           |                 |
           v                 v
       MySQL             MySQL
   universidad_       universidad_
   estudiantes          cursos
```

## 3. Tecnologías utilizadas

- Node.js
- Express
- MySQL
- MySQL2
- JavaScript
- HTML y CSS
- Jest
- Supertest
- Git y GitHub
- Postman

## 4. Estructura del proyecto

```text
gestion-academica/
│
├── estudiantes/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── public/
│   ├── routes/
│   ├── tests/
│   ├── package.json
│   └── server.js
│
├── cursos/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── package.json
│   └── server.js
│
├── gateway/
│   ├── package.json
│   └── server.js
│
└── .gitignore
```

## 5. Servicios y endpoints

### Estudiantes

Dirección base: `http://localhost:3000/api/estudiantes`

| Método | Endpoint | Función |
|---|---|---|
| GET | /api/estudiantes | Listar estudiantes |
| GET | /api/estudiantes/:id | Consultar estudiante |
| POST | /api/estudiantes | Registrar estudiante |
| PUT | /api/estudiantes/:id | Actualizar estudiante |
| DELETE | /api/estudiantes/:id | Eliminar estudiante |

### Cursos

Dirección base: `http://localhost:3001/api/cursos`

| Método | Endpoint | Función |
|---|---|---|
| GET | /api/cursos | Listar cursos |
| GET | /api/cursos/:id | Consultar curso |
| POST | /api/cursos | Registrar curso |
| PUT | /api/cursos/:id | Actualizar curso |
| DELETE | /api/cursos/:id | Eliminar curso |

### API Gateway

Dirección principal: `http://localhost:4000`

El Gateway permite acceder a los microservicios mediante:

- `/api/estudiantes`
- `/api/cursos`

## 6. Bases de datos

Se utilizan dos bases de datos independientes:

- `universidad_estudiantes`
- `universidad_cursos`

Cada microservicio administra su propia información y conexión a MySQL.

## 7. Instalación y ejecución

Se requiere tener instalado Node.js y MySQL.

Instalar las dependencias en cada carpeta:

```bash
cd estudiantes
npm install

cd ../cursos
npm install

cd ../gateway
npm install
```

Configurar los archivos `.env` de cada servicio con sus respectivas credenciales de MySQL y puertos.

Iniciar cada servidor desde su carpeta:

```bash
npm start
```

Los servicios funcionan en:

- Estudiantes: puerto 3000.
- Cursos: puerto 3001.
- API Gateway: puerto 4000.

## 8. Pruebas automatizadas

Se utilizaron Jest y Supertest para verificar las operaciones de los microservicios.

Resultados obtenidos:

- Estudiantes: 11 pruebas aprobadas.
- Cursos: 6 pruebas aprobadas.
- Total: 17 pruebas aprobadas.

Para ejecutar las pruebas:

```bash
npm test
```

## 9. Herramientas de prueba

Se utilizó Postman para comprobar las solicitudes HTTP y verificar las respuestas de las APIs REST.

## 10. Autor

**Yunior Vila**

Proyecto académico - Ingeniería de Sistemas e Informática.

Universidad Continental.
