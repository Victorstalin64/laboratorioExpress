# 🚌 Laboratorio: Fundamentos de Express — Cooperativa Trans Andes

**Escuela Politécnica Nacional — Escuela de Formación de Tecnólogos**
**Asignatura:** Desarrollo de Aplicaciones Web
**Profesor:** Ing. Byron Loarte

## 📖 Descripción

Servidor desarrollado con **Node.js y Express** que aplica los conceptos vistos en clase (*Fundamentos de Express*) a un caso de la vida real: el sistema web de una **cooperativa de buses interprovincial**, que permite vender boletos, enviar encomiendas, reservar asientos, consultar información de los buses y acceder a un panel administrativo protegido.

Cada ruta del archivo `index.js` incluye un comentario que explica su aplicación práctica.

## 🛠️ Tecnologías

- Node.js (v20.11 o superior)
- Express 4
- JavaScript con ES Modules

## ⚙️ Instalación y ejecución

```bash
# 1. Clonar el repositorio
git clone <URL-DEL-REPOSITORIO>
cd laboratorio-trans-andes

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

El servidor queda disponible en **http://localhost:3000**

## 📁 Estructura del proyecto

```
laboratorio-trans-andes/
├── public/
│   └── mapa.png          # Imagen servida con res.sendFile()
├── index.js              # Servidor y rutas
├── package.json
├── pruebas.http          # Peticiones de prueba (REST Client)
├── .gitignore
└── README.md
```

## 🧭 Temas aplicados y rutas

| Tema | Método | Ruta | Aplicación práctica |
|---|---|---|---|
| Route / Response | GET | `/` | Mensaje de bienvenida de la cooperativa |
| Request: `body` | POST | `/boletos` | Emitir un boleto con nombre y destino |
| Request: `params` | POST | `/encomiendas/:ciudad` | Enviar una encomienda a una ciudad |
| Request: `query` | POST | `/reservas?asiento=12&servicio=ejecutivo` | Reservar un asiento |
| Response: texto | GET | `/conductores` | Listado de conductores |
| Response: JSON | GET | `/buses` | Datos de un bus (placa, ruta, capacidad) |
| Response: archivo | GET | `/mapa-rutas` | Imagen del mapa de rutas |
| Response: HTML | GET | `/equipaje` | Equipaje permitido en el bus |
| Middleware (público) | GET | `/informacion` | Horarios disponibles para todos |
| Middleware (protegido) | GET | `/panel-administrador` | Panel interno, requiere token |
| Ruta no encontrada | — | cualquier otra | Respuesta 404 |

## 🧪 Ejemplos de prueba

> Las rutas `POST` no se pueden probar desde la barra del navegador. Usa **curl**, **Postman**, **Thunder Client** o la extensión **REST Client** con el archivo `pruebas.http`.

**Emitir un boleto (body):**
```bash
curl -X POST http://localhost:3000/boletos \
  -H "Content-Type: application/json" \
  -d '{"pasajero":"Marcelo Tipán","destino":"Cuenca"}'
```

**Enviar una encomienda (params):**
```bash
curl -X POST http://localhost:3000/encomiendas/Loja
```

**Reservar un asiento (query):**
```bash
curl -X POST "http://localhost:3000/reservas?asiento=12&servicio=ejecutivo"
```

**Acceder al panel protegido (middleware):**
```bash
# Sin token → acceso denegado
curl http://localhost:3000/panel-administrador

# Con token → acceso permitido
curl http://localhost:3000/panel-administrador -H "token: terminal2026"
```

## 👥 Entrega

| GRUPO - # | |
|---|---|
| **Integrantes** | **Link del repositorio** |
| Nombre Apellido 1 | https://github.com/usuario/laboratorio-trans-andes |
| Nombre Apellido 2 | |
| Nombre Apellido 3 | |
| **Observación:** | Todos los integrantes participaron en el laboratorio. |

---
*Prof. Ing. Byron Loarte — Desarrollo de Aplicaciones Web*
