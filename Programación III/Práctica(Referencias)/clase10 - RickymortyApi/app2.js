
let apellido = "orellana"

let profesores = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "",
    enseñar: () => console.log("ensel;ando"),
    casado: true,
    edad: 30,
  },
  {
    id: 2,
    nombre: "debroa",
    apellido: "",
    enseñar: () => console.log("ensel;ando"),
    casado: true,
    edad: 30,
  },
  {
    id: 3,
    nombre: "pepe",
    apellido: "",
    enseñar: () => console.log("ensel;ando"),
    casado: true,
    edad: 30,
  },
];

profesores[1].nombre = "debora"

console.log(profesores);

let nuevoPorfesor = {
    id:4,
    nombre:"raquel",
    edad:20
}

profesores.push({id:4,
    nombre:"raquel",
    edad:20})

console.log(profesores);


//for for of foreach map

profesores.map(profesor=>console.log(profesor))

for (let item of profesores) {
    let algo = false
    console.log(item.nombre)
}
console.log(profesores.length);

let resp = await fetch(api)
fetch(api).then(resp=>resp)

const handleSubmit = () =>{
let nombre =document.getElementById("input").value


}


function nombre (parametro) {
let nombre = "raul"
}

nombre(akdlashdsad)

document.getElementById("form").addEventListener("submit",handleSubmit)

//map replace rezise remove foreach filter some fgind reverse removeFilter




document.getElementsByClassName("root").innerHtml = ",h3>hola a"