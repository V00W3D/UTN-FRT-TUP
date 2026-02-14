import { get, post, put, del } from './api';

const base = '/actividades';
export const fetchActividades = () => get(base);
export const createActividad = (data) => post(base, data);
export const updateActividad = (id, data) => put(`${base}/${id}`, data);
export const deleteActividad = (id) => del(`${base}/${id}`);
