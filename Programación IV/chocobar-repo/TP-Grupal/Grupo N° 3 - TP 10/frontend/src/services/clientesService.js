import { get, post, del } from "../api.js";

// ======= Simulación (DESACTIVADO) =======
/*
// Simula una "API" de clientes sin backend
let clientes = [
  { id: 1, nombre: "Juan Pérez", email: "juan@mail.com", telefono: "123456" },
  { id: 2, nombre: "María García", email: "maria@mail.com", telefono: "654321" },
  { id: 3, nombre: "Carlos López", email: "carlos@mail.com", telefono: "987654" },
];

// Simular delay de red
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchClientes = async () => {
  await delay(200); // simulamos retardo
  return clientes;
};

export const agregarCliente = async (cliente) => {
  await delay(200);
  const nuevo = { ...cliente, id: Date.now() };
  clientes.push(nuevo);
  return nuevo;
};

export const actualizarCliente = async (id, datos) => {
  await delay(200);
  clientes = clientes.map(c => c.id === id ? { ...c, ...datos } : c);
  return clientes.find(c => c.id === id);
};

export const eliminarCliente = async (id) => {
  await delay(200);
  clientes = clientes.filter(c => c.id !== id);
  return true;
};
*/

// ======= IMPLEMENTACIÓN REAL (usa backend) =======
export const fetchClientes = async () => {
  return await get("/clientes");
};

export const agregarCliente = async (cliente) => {
  const payload = {
    nombre: cliente.nombre,
    correo: cliente.email ?? cliente.correo,
    telefono: cliente.telefono,
  };
  return await post("/clientes", payload);
};

export const eliminarCliente = async (id) => {
  await del(`/clientes/${id}`);
  return true;
};

