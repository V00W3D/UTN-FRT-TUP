// const API = "http://localhost:3001";

// export async function get(ruta) {
//   const res = await fetch(API + ruta);
//   if (!res.ok) throw new Error("Error GET " + ruta);
//   return await res.json();
// }

// export async function post(ruta, data) {
//   const res = await fetch(API + ruta, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) throw new Error("Error POST " + ruta);
//   return await res.json();
// }


const API = "http://localhost:3001";

export async function get(ruta) {
  const res = await fetch(API + ruta);
  if (!res.ok) throw new Error("Error GET " + ruta);
  return await res.json();
}

export async function post(ruta, data) {
  const res = await fetch(API + ruta, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error POST " + ruta);
  return await res.json();
}

export async function patch(ruta, data) {
  const res = await fetch(API + ruta, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error PATCH " + ruta);
  return await res.json();
}

export async function del(ruta) {
  const res = await fetch(API + ruta, { method: "DELETE" });
  if (!res.ok) throw new Error("Error DELETE " + ruta);
  return true;
}
