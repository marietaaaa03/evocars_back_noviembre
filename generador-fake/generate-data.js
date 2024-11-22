const { faker } = require('@faker-js/faker');
const pool = require('./db.js');

// Generate users
async function generateUsers() {
  const users = [];
  const roles = ['1', '2'];
  const plans = ['1', '2']; // Assuming you have 3 plans, adjust as needed

  for (let i = 0; i < 1000; i++) {
    users.push([
      faker.person.fullName(),
      faker.internet.email(),
      faker.internet.password(),
      faker.date.past(30, new Date('2000-01-01')),
      faker.helpers.arrayElement(['Masculino', 'Femenino']),
      faker.helpers.arrayElement(roles),
      'foto_perfil.png',
      faker.helpers.arrayElement(plans),
      faker.date.past(5)
    ]);
  }

  const query = `INSERT INTO usuarios 
    (nombre, email, contrasena, fecha_nac, genero, id_rol, foto, id_plan, fecha_decreacion)
    VALUES ?`;

  await pool.query(query, [users]);
}

// Generate cars
async function generateAutos() {
  const autos = [];

  for (let i = 0; i < 1000; i++) {
    autos.push([
      faker.vehicle.model(),
      faker.company.name(),
      faker.number.int({ min: 4, max: 8 }),
      faker.number.int({ min: 100, max: 500 }),
      faker.number.int({ min: 1, max: 10 }),
      faker.number.int({ min: 1, max: 5 }),
      faker.number.float({ min: 250, max: 600 }),
      faker.number.int({ min: 1, max: 5 }),
      faker.lorem.sentence(),
      'auto.png',
      faker.number.int({ min: 1, max: 100 })
    ]);
  }

  const query = `INSERT INTO autos 
    (modelo, marca, cilindros, potencia, id_color, id_categoria, precio_diario, id_motor, descripcion, foto_principal,id_usuario)
    VALUES ?`;

  await pool.query(query, [autos]);
}

// Generate rentals
async function generateRentas() {
  const rentas = [];

  for (let i = 0; i < 5000; i++) {
    const fechaReserva = faker.date.past(3);
    const fechaInicio = faker.date.future(0.1, fechaReserva);
    const fechaFin = faker.date.future(0.1, fechaInicio);
    rentas.push([
      faker.number.int({ min: 1, max: 1000 }),
      faker.number.int({ min: 1, max: 500 }),
      faker.string.uuid(),
      fechaReserva,
      fechaInicio,
      fechaFin,
      faker.helpers.arrayElement(['pendiente', 'completado']),
      faker.number.int({ min: 1, max: 10 }),
      faker.number.float({ min: 100, max: 1000 }),
      faker.number.int({ min: 1, max: 5 }),
      faker.number.float({ min: 5, max: 50 })
    ]);
  }

  const query = `INSERT INTO rentas 
    (id_usuario, id_auto, stripe_payment_id, fecha_reserva, fecha_inicio, fecha_fin, estado, id_sucursal, precio_total, id_comision, comision)
    VALUES ?`;

  await pool.query(query, [rentas]);
}

// Generate branches
async function generateSucursales() {
  const sucursales = [];

  for (let i = 0; i < 10; i++) {
    sucursales.push([
      faker.company.name(),
      faker.location.streetAddress(),
      faker.phone.number(),
      faker.location.zipCode(),
      faker.location.countryCode()
    ]);
  }

  const query = `INSERT INTO sucursales (nombre_sucursal, direccion, telefono, cp, codigo_ciudad) VALUES ?`;

  await pool.query(query, [sucursales]);
}

// Generate categories
async function generateCategorias() {
  const categorias = [];

  for (let i = 0; i < 5; i++) {
    categorias.push([faker.commerce.department()]);
  }

  const query = `INSERT INTO categorias (nombre_categoria) VALUES ?`;

  await pool.query(query, [categorias]);
}

// Generate colors
async function generateColores() {
  const colores = [];

  for (let i = 0; i < 10; i++) {
    colores.push([faker.color.human()]);
  }

  const query = `INSERT INTO colores (descripcion) VALUES ?`;

  await pool.query(query, [colores]);
}

// Generate motors
async function generateMotores() {
  const motores = [];

  for (let i = 0; i < 5; i++) {
    motores.push([faker.vehicle.type()]);
  }

  const query = `INSERT INTO motores (tipo_motor) VALUES ?`;

  await pool.query(query, [motores]);
}

// Generate commissions
async function generateComisiones() {
  const comisiones = [];

  for (let i = 0; i < 5; i++) {
    comisiones.push([
      faker.date.past(10, new Date().getFullYear().toString()).getFullYear(),
      faker.number.float({ min: 5, max: 50 })
    ]);
  }

  const query = `INSERT INTO comision (anio, porcentaje) VALUES ?`;

  await pool.query(query, [comisiones]);
}

// Generate cupones
async function generateCupones() {
  const cupones = [];

  for (let i = 0; i < 50; i++) {
    cupones.push([
      faker.number.int({ min: 1, max: 1000 }),
      faker.string.alphanumeric(8).toUpperCase(),
      faker.lorem.sentence(),
      faker.helpers.arrayElement(['porcentaje', 'monto_fijo']),
      faker.number.float({ min: 5, max: 50 }),
      faker.date.future(),
      faker.date.future(),
      faker.number.int({ min: 1, max: 100 }),
      0
    ]);
  }

  const query = `INSERT INTO cupones 
    (id_usuario, codigo, descripcion, tipo_descuento, valor_descuento, fecha_inicio, fecha_fin, uso_maximo, uso_actual)
    VALUES ?`;

  await pool.query(query, [cupones]);
}

// Generate cupones_por_reserva
async function generateCuponesPorReserva() {
  const cuponesPorReserva = [];

  for (let i = 0; i < 100; i++) {
    cuponesPorReserva.push([
      faker.number.int({ min: 1, max: 50 }),
      faker.number.int({ min: 1, max: 5000 })
    ]);
  }

  const query = `INSERT INTO cupones_por_reserva (id_cupon, id_reserva) VALUES ?`;

  await pool.query(query, [cuponesPorReserva]);
}

// Generate cupones_por_vendedor
async function generateCuponesPorVendedor() {
  const cuponesPorVendedor = [];

  for (let i = 0; i < 50; i++) {
    cuponesPorVendedor.push([
      faker.number.int({ min: 1, max: 50 }),
      faker.number.int({ min: 1, max: 1000 })
    ]);
  }

  const query = `INSERT INTO cupones_por_vendedor (id_cupon, id_usuario) VALUES ?`;

  await pool.query(query, [cuponesPorVendedor]);
}

// Generate disponibilidad
async function generateDisponibilidad() {
  const disponibilidad = [];

  for (let i = 0; i < 1000; i++) {
    const fechaInicio = faker.date.future();
    disponibilidad.push([
      faker.number.int({ min: 1, max: 500 }),
      fechaInicio,
      faker.date.future(0.1, fechaInicio),
      faker.helpers.arrayElement(['disponible', 'no disponible']),
      faker.number.int({ min: 1, max: 10 })
    ]);
  }

  const query = `INSERT INTO disponibilidad 
    (id_auto, fecha_inicio, fecha_fin, estado, id_sucursal)
    VALUES ?`;

  await pool.query(query, [disponibilidad]);
}

// Generate fotos_autos
async function generateFotosAutos() {
  const fotosAutos = [];

  for (let i = 0; i < 1500; i++) {
    fotosAutos.push([
      faker.number.int({ min: 1, max: 500 }),
      faker.image.url()
    ]);
  }

  const query = `INSERT INTO fotos_autos (id_auto, url_foto) VALUES ?`;

  await pool.query(query, [fotosAutos]);
}

// Generate ofertas
async function generateOfertas() {
  const ofertas = [];

  for (let i = 0; i < 100; i++) {
    const fechaInicio = faker.date.future();
    ofertas.push([
      faker.number.int({ min: 1, max: 500 }),
      faker.lorem.sentence(),
      faker.helpers.arrayElement(['porcentaje', 'monto_fijo']),
      faker.number.float({ min: 5, max: 50 }),
      fechaInicio,
      faker.date.future(0.1, fechaInicio)
    ]);
  }

  const query = `INSERT INTO ofertas 
    (id_auto, descripcion, tipo_descuento, valor_descuento, fecha_inicio, fecha_fin)
    VALUES ?`;

  await pool.query(query, [ofertas]);
}

// Generate pagos
async function generatePagos() {
  const pagos = [];

  for (let i = 0; i < 5000; i++) {
    pagos.push([
      faker.number.int({ min: 1, max: 1000 }),
      faker.date.past(),
      faker.number.float({ min: 100, max: 10000 }),
      faker.helpers.arrayElement(['tarjeta', 'efectivo', 'transferencia'])
    ]);
  }

  const query = `INSERT INTO pagos 
    (id_usuarios, fecha_pago, monto, tipo_pago)
    VALUES ?`;

  await pool.query(query, [pagos]);
}

// Generate permisos
async function generatePermisos() {
  const permisos = [
    ['Crear usuario', 'create_user'],
    ['Editar usuario', 'edit_user'],
    ['Eliminar usuario', 'delete_user'],
    ['Ver rentas', 'view_rentals'],
    ['Crear renta', 'create_rental']
  ];

  const query = `INSERT INTO permisos (nombre_permiso, clave) VALUES ?`;

  await pool.query(query, [permisos]);
}

// Generate permisos_por_rol
async function generatePermisosPorRol() {
  const permisosPorRol = [];

  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 5; j++) {
      if (Math.random() > 0.5) {
        permisosPorRol.push([i, j]);
      }
    }
  }

  const query = `INSERT INTO permisos_por_rol (id_rol, id_permiso) VALUES ?`;

  await pool.query(query, [permisosPorRol]);
}

// Execute data generation
async function main() {
  try {
    await generateUsers();
    await generateAutos();
    await generateRentas();
    await generateSucursales();
    await generateCategorias();
    await generateColores();
    await generateMotores();
    await generateComisiones();
    await generateCupones();
    await generateCuponesPorReserva();
    await generateCuponesPorVendedor();
    await generateDisponibilidad();
    await generateFotosAutos();
    await generateOfertas();
    await generatePagos();
    await generatePermisos();
    await generatePermisosPorRol();
    console.log('Datos generados exitosamente');
    process.exit(0);
  } catch (err) {
    console.error('Error generando datos:', err);
    process.exit(1);
  }
}

main();