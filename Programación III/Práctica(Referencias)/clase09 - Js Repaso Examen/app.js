// let materias = ["prog 3", "DB", "metod"];

// const asignaturas = ["prog 3", "DB", "metod"];

// class Alumno {
//      nombre

//     getnombre () {}
// }

const materia = {
  idMateria: 1,
  nombre: "prog 3",
  contenido: "javascript",
  cuatrimestre: "1°",
  aula: 241,
  profesores: [
    {
      idProfesor: 1,
      nombreCompleto: "raul politi",
      mascotas: [
        {
          idMascota: 1,
          nombreMascota: "paco",
          raza: "salchicha",
          vacunas: [
            {
              idVacuna: 1,
              nombreVacuna: "astrazeneca",
              ml: 200,
            },
          ],
          dormir: () => console.log("zzz zzzz "),
        },
        {},
      ],
    },
    {},
    {},
  ],
  cargaHs: 4,
  //cargaHsSemanal:materia.cargaHs*2,
  //cargaHsCautrimeste: cargaHsSemanal*16,
  bibliografia: ["la biblia del codigo", "js for begginers", "js ecma6"],
};
console.log(materia.profesores.length);

let contador = 0;
for (let i = 0; i < materia.profesores.length; i++) {
  contador++;
}

console.log("los profesores son " + contador);

// materia.profesores[0].mascotas[0].dormir();
//console.log(materia.cargaHs);

// let navarroVictor = {
//     materiasAprobadas : ["prog2","prog1","logica"],
//     materiasDesaprobadas: ["base de datos","metodologia"]
// }

// //console.log(navarroVictor.materiasAprobadas);

// let cantidad = materia.profesores[0].mascotas[0].vacunas[0].ml
// //console.log(cantidad);

// cantidad = 5

// //console.log(cantidad);

// for (const materia of materias) {
//   document.getElementById("listado").innerHTML += `
// <li>${materia}</li>

// `;
// }

let array = [];

const handleSubmit = (e) => {
  e.preventDefault();

  //console.log(e);

  let mail = document.getElementById("input").value;

  if (mail === "") {
    alert("debes ingresar el mail");
  } else {
    array.push(mail);
    document.getElementById("mail").innerHTML = mail;
    //document.getElementById("input").value =""
    e.target.reset();
  }
};

document.getElementById("formulario").addEventListener("submit", handleSubmit);
console.log(array);

const getData = async () => {
  let response = await fetch("https://randomuser.me/api/?results=20");
  let resp = await response.json();
  console.log(resp.results);

    for (const user of resp.results) {
        console.log(user.name.first);
        document.getElementById("api").innerHTML += `
<li>${user.name.first}</li>
<li>
<img src=${user.picture.medium}>
</li>
`
    }

//   resp.results.forEach(
//     (user) =>
//       ()
//   );
};
getData();
