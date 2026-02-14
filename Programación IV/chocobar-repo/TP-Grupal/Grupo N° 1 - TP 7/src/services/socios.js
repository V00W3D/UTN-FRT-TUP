import { get, post, put, del } from './api';

const base = '/socios';
export const fetchSocios = () => get(base);
export const createSocio = (data) => post(base, data);
export const updateSocio = (id, data) => put(`${base}/${id}`, data);
export const deleteSocio = (id) => del(`${base}/${id}`);
