const LenguajesProgramacion = [
  {
    id: 1,
    nombre: "JavaScript",
    tipo: "Interpretado",
    descripcion:"Utilizado principalmente para crear aplicaciones web interactivas y dinámicas en el navegador.",
  },
  {
    id: 2,
    nombre: "C#",
    tipo: "Compilado",
    descripcion:
      "Lenguaje de programación desarrollado por Microsoft, utilizado principalmente para aplicaciones de escritorio y desarrollo web.",
  },
  {
    id: 3,
    nombre: "Python",
    tipo: "Alto nivel",
    descripcion:
      "Lenguaje de propósito general conocido por su legibilidad y simplicidad. Utilizado en desarrollo web, ciencia de datos, inteligencia artificial, entre otros.",
  },
  {
    id: 4,
    nombre: "Java",
    tipo: "Estricto",
    descripcion:
      "Lenguaje de programación orientado a objetos, ampliamente utilizado en aplicaciones empresariales y desarrollo de Android.",
  },
  {
    id: 5,
    nombre: "PHP",
    tipo: "Semiduro",
    descripcion:
      "Lenguaje de programación del lado del servidor, utilizado principalmente para el desarrollo web y la creación de aplicaciones dinámicas.",
  },
  {
    id: 6,
    nombre: "C++",
    tipo: "Compilado",
    descripcion:
      "Lenguaje de programación de propósito general, utilizado en desarrollo de sistemas, videojuegos y aplicaciones de alto rendimiento.",
  },
  {
    id: 7,
    nombre: "Typescript",
    tipo: "Compilado",
    descripcion:
      "Superset de JavaScript que añade tipado estático y características orientadas a objetos, utilizado en aplicaciones web modernas.",
  },
  {
    id: 8,
    nombre: "Ruby",
    tipo: "Alto nivel",
    descripcion:
      "Lenguaje de programación dinámico y orientado a objetos, conocido por su simplicidad y productividad. Utilizado en desarrollo web con Ruby on Rails.",
  },
  {
    id: 9,
    nombre: "GO",
    tipo: "Compilado",
    descripcion:
      "Lenguaje de programación desarrollado por Google, conocido por su eficiencia y facilidad de uso en aplicaciones concurrentes y distribuidas.",
  },
];
const tabla=document.getElementById("TablaLenguajes");
for (const Lenguaje of LenguajesProgramacion) {
  tabla.innerHTML += `
    <tr>
      <td>${Lenguaje.id}</td>  
      <td>${Lenguaje.nombre}</td>
      <td>${Lenguaje.tipo}</td>
      <td>${Lenguaje.descripcion}</td>
    </tr>`;
}


//fetch()
//axios biblioteca para realizar peticiones http

//consr RANDOM_URL = ""

//const getDate = () => {
//fetch(RANDOM_URL).then(resp=>resp.json()).then(resul=>console.log)
//Database()//
