import api from '../services/api.js';
import {USUARIOS_URL} from '../endpoints/auth.js';

export const login = async () => {
    const response =  await api.get(USUARIOS_URL);
    return response.data;
}