//permite que la direccion de la api se modularice aún más para poder ocultarla, y poder usarla en los servicios
//de una forma más segura sin mostrar la direccion de la api
export const URL_API = import.meta.env.VITE_URL_API