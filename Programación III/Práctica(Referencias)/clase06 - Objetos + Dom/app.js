console.log("hola");

// 5)- Crea una función llamada numPares que genere los números pares que hay entre
// 2 valores que deberá pasar x parámetro a la función y luego mostrar esos números x consola.

//funcion normal
function numPares2() {}

//funcion flecha
const numPares = (num1, num2) => {
  for (let i = num1 + 1; i < num2; i++) {
    if (i % 2 === 0) {
      console.log(i);
    }
  }
};

//numPares(100, 1000);

let arrayNombres = ["solana", "claudio", "facundo", "rita", "carla"];

const buscarNombre = (arrayNombres, nombre) => {
  let nombresFiltrados = arrayNombres.find((nom) => nom === nombre);

  console.log(nombresFiltrados);

  if (nombresFiltrados) {
    //alert("si esta el nombre")
  }

  // for (let i = 0; i < arrayNombres.length; i++) {
  //     if (arrayNombres[i]===nombre) {
  //         console.log("si esta");
  //         break
  //     }else {
  //         console.log("no esta");

  //     }

  // }
};

buscarNombre(arrayNombres, "facundo");

let perritos = [];

perritos.push("sultan");

perritos.unshift("negrito");

console.log(perritos);

let Alumno = {
  nombre: "",
  edad: null,
  legajo: null,
  dni: null,
  domicilio: "",
  carrera: "",
  materiasCursadas: [],
  comision: null,
  estudiar: () => {
    console.log("estudiando");
  },

};

Alumno.nombre = "ruben"


class Estudiante{
   
    constructor (nombre,edad){
        this.nombre = nombre
        this.edad  = edad
    }

    Dormir (){
        console.writeLine("ZZZzzzz")
    }
}


const ruben = new Estudiante("ruben",20)
const camila = new Estudiante("camila",18)

console.log(camila.nombre);

//objeto literal
const Gato = {
    nombre:"garfield",
    edad:4,
    raza:"felina",
    
}

//JSON(js object notation)
// {
//     "nombre":"garfield",
//     "edad":4,
//     "raza":"felina",
//     "estudiante"}



const Farmacia = {
    nombre:"",
    direccion:"",
    productos:[{
        categoria:"perfumeria",
        
    },{
    }],
    medicamentos:["paracetamol","ibuprofeno"],
    imagenFarmacia:"http://www.farmacialaunion.com/imagen21",
    clientes:[{
        id:1,
        nombreCliente:"pepito jerez",


    },{},{}]

}


//DOM(document object model)
let subtitulo = document.getElementById("subtitulo")

subtitulo.innerHTML = "Comision 9"


// document.getElementById("parrafo").innerHTML = "alumnos de la com 9 aprendiendo javascript y DOM"

document.querySelector(".parrafo").innerHTML = "alumnos de la com 9 aprendiendo javascript y DOM"
let footer = document.getElementById("footer")
footer.style.backgroundColor = "orange"
footer.style.color ="blue"
footer.style.textAlign = "center"


const respirar = () =>{
    console.log("respirando");
}

respirar()




const getDate = () => {
    let datos = new Date()

    let dia = datos.getDate()
    let horas = datos.getHours()
    let minutos = datos.getMinutes()
    let segundos = datos.getSeconds(0)
    
    console.log(dia+" "+horas+":"+minutos+":"+segundos);
}

//setInterval(getDate,1000)


const saludar = () =>{
    console.log("hola alumnos");
}


document.getElementById("boton").addEventListener("click",()=>despedirse)

function despedirse ( ){
    alert("adios alumnos")
}
const cambiarFondo = () =>{
    document.getElementById("fondoh4").style.backgroundColor = "green"
    //alert("cambio fondo")
}


document.getElementById("fondoh4").addEventListener("mouseenter",cambiarFondo)

const salgoH4 = () =>{
    document.getElementById("fondoh4").style.backgroundColor = "#ff5433"
}

document.getElementById("fondoh4").addEventListener("mouseleave",salgoH4)

