import express from "express";
import path from "path";

const app = express();

// ============================================================
// CASO DE LA VIDA REAL: Cooperativa de buses "Trans Andes"
// Sistema web de la terminal: venta de boletos, encomiendas,
// reservas de asientos, información de buses y panel interno.
// ============================================================

// ✅ Route
// Es la "ventanilla" del servidor: cada ruta es un servicio que
// la cooperativa ofrece al público.
// Aplicación práctica: así como en la terminal hay una ventanilla
// para boletos, otra para encomiendas y otra para reservas, aquí
// cada ventanilla es una ruta:
//   app.post("/boletos")
//   app.post("/encomiendas/:ciudad")
//   app.post("/reservas")

// ✅ Response
// Es la respuesta que el servidor le da al cliente o aplicación.
// Aplicación práctica: al abrir la página principal, la cooperativa
// saluda al pasajero con un mensaje de bienvenida.
app.get("/", (req, res) => {
  res.send("Bienvenido a la Cooperativa de Transporte Trans Andes 🚌");
});

// ✅ Request
// Es la petición u orden que el cliente le hace al servidor.
// Aplicación práctica: el pasajero llena un formulario con sus datos
// y los envía al servidor.
app.use(express.json()); // Permite que las peticiones entren en formato JSON

// --- Request con BODY (req.body) ---
// Aplicación práctica: compra de un boleto. El pasajero envía su
// nombre y destino en el cuerpo de la petición y el sistema emite
// el boleto.
app.post("/boletos", (req, res) => {
  console.log(req.body);
  const { pasajero, destino } = req.body;
  res.send(`Boleto emitido: ${pasajero} viaja con destino a ${destino}`);
});

// --- Request con PARAMS (req.params) ---
// Aplicación práctica: envío de una encomienda. La ciudad de destino
// va en la misma ruta, ej: POST /encomiendas/Cuenca
app.post("/encomiendas/:ciudad", (req, res) => {
  console.log(req.params);
  const { ciudad } = req.params;
  res.send(`Tu encomienda será enviada a la ciudad de: ${ciudad}`);
});

// --- Request con QUERY (req.query) ---
// Aplicación práctica: reserva de asiento. El número de asiento y el
// tipo de servicio viajan después del "?", ej:
// POST /reservas?asiento=12&servicio=ejecutivo
app.post("/reservas", (req, res) => {
  console.log(req.query);
  const { asiento, servicio } = req.query;
  res.send(`Reservaste el asiento ${asiento} en servicio ${servicio}`);
});

// ✅ Response (distintos tipos de respuesta)

// res.send() con texto
// Aplicación práctica: el administrador consulta el listado de choferes.
app.get("/conductores", (req, res) => {
  res.send("Listado de conductores de la cooperativa....");
});

// res.json()
// Aplicación práctica: una app móvil consulta los datos de un bus
// y recibe la información en formato JSON.
app.get("/buses", (req, res) => {
  res.json({
    id: 305,
    placa: "PBA-4821",
    ruta: "Quito - Riobamba",
    capacidad: 40,
  });
});

// res.sendFile()
// Aplicación práctica: el pasajero descarga/visualiza la imagen del
// mapa de rutas de la cooperativa.
app.get("/mapa-rutas", (req, res) => {
  console.log(path.join(import.meta.dirname, "public", "mapa.png"));
  res.sendFile(path.join(import.meta.dirname, "public", "mapa.png"));
});

// res.send() con HTML
// Aplicación práctica: página con la lista de equipaje permitido
// dentro del bus.
app.get("/equipaje", (req, res) => {
  res.send(`
    <h1>Equipaje permitido en el bus</h1>
    <ul>
        <li>Mochila de mano (hasta 5 kg)</li>
        <li>Maleta mediana en bodega</li>
        <li>Coche de bebé plegable</li>
        <li>Mascota pequeña con transportadora</li>
    </ul>
  `);
});

// Middleware
// Es una función (guardia de seguridad) que se ejecuta entre la
// petición y la respuesta.
// Aplicación práctica: en la terminal, la sala de espera es pública,
// pero la oficina administrativa solo permite entrar con credencial.

// Gratis (pública): está ANTES del guardia, así que no pide token
app.get("/informacion", (req, res) =>
  res.send("Horarios y frecuencias de salida disponibles para todo el público")
);

// Guardia (middleware): revisa la credencial (token) en los headers
app.use((req, res, next) => {
  const { token } = req.headers;
  const response = token == "terminal2026" ? true : false;
  response
    ? next()
    : res.send("Acceso denegado: no posee credencial (token) o no tiene permisos");
});

// Protegida: está DESPUÉS del guardia, solo entra con token válido
// Aplicación práctica: el panel donde el administrador ve las ventas del día.
app.get("/panel-administrador", (req, res) =>
  res.send("Bienvenido al panel de administración de Trans Andes")
);

// Ruta no encontrada (404)
// Aplicación práctica: si el pasajero escribe mal la dirección, recibe
// un mensaje claro en lugar de un error confuso.
app.use((req, res) => res.status(404).send("Ruta no encontrada"));

app.listen(3000, () => {
  console.log("Servidor Trans Andes corriendo en http://localhost:3000");
});
