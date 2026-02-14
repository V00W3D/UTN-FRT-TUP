// src/services/loginService.js
export async function loginUsuario(usuario, password) {
  // Simulación de "usuarios guardados"
  const usuarios = [
    { id: 1, usuario: "admin", password: "1234", rol: "admin" }
  ];

  // Simular demora de red
  await new Promise((res) => setTimeout(res, 500));

  const user = usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );

  if (!user) {
    throw new Error("Credenciales incorrectas");
  }

  return user;
}
