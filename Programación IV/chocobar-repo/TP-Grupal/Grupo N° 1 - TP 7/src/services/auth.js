import { get } from './api';

export async function loginUser(email, password) {
  const users = await get(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
  if (Array.isArray(users) && users.length > 0) return users[0];
  throw new Error('Credenciales inválidas');
}
