import { get, post, del } from "../api.js";

// ======= Simulación (DESACTIVADO) =======
/*
// Simulación de servicios
let servicios = [
  { id: 1, nombre: "Corte", duracion_minutos: 60, precio: 70000 },
  { id: 2, nombre: "Nutricion", duracion_minutos: 45, precio: 9000 },
  { id: 3, nombre: "Mechitas", duracion_minutos: 240, precio: 30000 },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchServicios = async () => {
  await delay(200);
  return servicios;
};

export const agregarServicio = async (servicio) => {
  await delay(200);
  const nuevo = { ...servicio, id: Date.now() };
  servicios.push(nuevo);
  return nuevo;
};

export const actualizarServicio = async (id, datos) => {
  await delay(200);
  servicios = servicios.map(s => s.id === id ? { ...s, ...datos } : s);
  return servicios.find(s => s.id === id);
};

export const eliminarServicio = async (id) => {
  await delay(200);
  servicios = servicios.filter(s => s.id !== id);
  return true;
};
*/

// ======= IMPLEMENTACIÓN REAL (usa backend) =======
// Estas funciones llaman al backend en http://localhost:3001 (API base en src/api.js)
export const fetchServicios = async () => {
  return await get("/servicios");
};

export const agregarServicio = async (servicio) => {
  
  const payload = {
    nombre: servicio.nombre,
    precio: servicio.precio,
  duracion_minutos: servicio.duracion_minutos ?? (servicio.duracion || 60),
  };
  return await post("/servicios", payload);
};

export const eliminarServicio = async (id) => {
  await del(`/servicios/${id}`);
  return true;
};


