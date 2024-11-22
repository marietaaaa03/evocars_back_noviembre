const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000" // Cambia esto según la URL de tu frontend
};

app.use(cors(corsOptions));

// Aumentar el límite de tamaño de la solicitud para JSON y URL encoded
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Parse requests of content-type - application/json
app.use(express.json());
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola desde el servidor backend." });
});

// Importar y usar las rutas
const usuariosRouter = require("./app/routes/usuarios");
const marcasRouter = require("./app/routes/marcas");
const permisoRouter = require("./app/routes/permiso");
const rolRouter = require("./app/routes/rol");
const compraRouter = require("./app/routes/compra");
const carrosRouter = require("./app/routes/carros");
const authRoutes = require('./app/routes/auth.routes');
const ofertaRoutes = require('./app/routes/oferta.routes'); // Rutas de ofertas
const sucursalRoutes = require('./app/routes/sucursal.routes'); // Rutas de sucursales
const autoRoutes = require('./app/routes/auto.routes'); // Rutas de autos
const colorRoutes = require('./app/routes/color.routes'); // Rutas de colores
const comisionRoutes = require('./app/routes/comision.routes'); // Rutas de comisiones
const categoriaRoutes = require('./app/routes/categoria.routes'); // Rutas de categorías
const cuponRoutes = require('./app/routes/cupon.routes'); // Rutas de cupones
const cuponPorReservaRoutes = require('./app/routes/cuponPorReserva.routes'); // Rutas de cupones por reserva
const cuponPorVendedorRoutes = require('./app/routes/cuponPorVendedor.routes'); // Rutas de cupones por vendedor
const disponibilidadRoutes = require('./app/routes/disponibilidad.routes'); // Rutas de disponibilidad
const fotosAutosRoutes = require('./app/routes/fotos_autos.routes'); // Rutas de fotos autos
const motoresRoutes = require('./app/routes/motores.routes'); // Rutas de motores
const permisosRoutes = require('./app/routes/permisos.routes'); // Rutas de permisos
const permisosPorRolRoutes = require('./app/routes/permisosPorRol.routes'); // Rutas de permisos por rol
const planRoutes = require('./app/routes/plan.routes'); // Rutas de plan
const rentaRoutes = require('./app/routes/renta.routes'); // Rutas de renta
const dashboardARoutes = require('./app/routes/dashboardA.routes');//dashboardA
const dashboardRRoutes = require('./app/routes/dashboardR.routes');//dashboardR

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRouter);
//app.use('/api/cupones', cuponRouter);
app.use('/api/marcas', marcasRouter);
app.use('/api/permiso', permisoRouter);
app.use('/api/rol', rolRouter);
app.use('/api/compra', compraRouter);
app.use('/api/carros', carrosRouter);
app.use('/api/ofertas', ofertaRoutes); // Prefijo para las rutas de ofertas
app.use('/api/sucursales', sucursalRoutes); // Prefijo para las rutas de sucursales
app.use('/api/autos', autoRoutes); // Prefijo para las rutas de autos
app.use('/api/colors', colorRoutes); // Prefijo para las rutas de colores
app.use('/api/comisiones', comisionRoutes); // Prefijo para las rutas de comisiones
app.use('/api/categorias', categoriaRoutes); // Prefijo para las rutas de categorías
app.use('/api/cupones', cuponRoutes); // Prefijo para las rutas de cupones
app.use('/api/cupones_por_reserva', cuponPorReservaRoutes); // Prefijo para las rutas de cupones por reserva
app.use('/api/cupones_por_vendedor', cuponPorVendedorRoutes); // Prefijo para las rutas de cupones por vendedor
app.use('/api/disponibilidad', disponibilidadRoutes); // Prefijo para las rutas de disponibilidad
app.use('/api/fotos_autos', fotosAutosRoutes); // Prefijo para las rutas de fotos autos
app.use('/api/motores', motoresRoutes); // Prefijo para las rutas de motores
app.use('/api/permisos', permisosRoutes); // Prefijo para las rutas de permisos
app.use('/api/permisos_por_rol', permisosPorRolRoutes); // Prefijo para las rutas de permisos por rol
app.use('/api/plan', planRoutes); // Prefijo para las rutas de plan
app.use('/api/renta', rentaRoutes); // Prefijo para las rutas de renta
app.use('/api/dashboard', dashboardARoutes); //dashboardA
app.use('/api/dashboard-rentador', dashboardRRoutes);//dashboardR
app.use('/api/notificaciones', require('./routes/notificaciones'));




// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor backend está corriendo en http://localhost:${PORT}`);
});
