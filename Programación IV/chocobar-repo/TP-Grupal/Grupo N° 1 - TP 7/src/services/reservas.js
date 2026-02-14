import { get, post, put, del } from './api';

const base = '/reservas';
export const fetchReservas = () => get(base);
export const createReserva = (data) => post(base, data);
export const updateReserva = (id, data) => put(`${base}/${id}`, data);
export const deleteReserva = (id) => del(`${base}/${id}`);
