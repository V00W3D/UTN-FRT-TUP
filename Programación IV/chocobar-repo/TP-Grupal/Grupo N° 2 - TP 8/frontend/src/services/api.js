import axios from "axios";

const IP = import.meta.env.VITE_IP;
const PORT = import.meta.env.VITE_PORT;

const API_URL = `http://${IP}:${PORT}`;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  getAll: async (endpoint) => {
    const { data } = await api.get(`/${endpoint}`);
    return data;
  },

  getById: async (endpoint, id) => {
    const { data } = await api.get(`/${endpoint}/${id}`);
    return data;
  },

  create: async (endpoint, payload) => {
    const { data } = await api.post(`/${endpoint}`, payload);
    return data;
  },

  update: async (endpoint, id, payload) => {
    const { data } = await api.put(`/${endpoint}/${id}`, payload);
    return data;
  },

  remove: async (endpoint, id) => {
    await api.delete(`/${endpoint}/${id}`);
  },
};
