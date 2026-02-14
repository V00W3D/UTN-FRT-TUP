console.log("hola mundo");
let suma; //scope global
let alumna = "solana";

// Funciones

function saludar(alumna) {
  console.log("hola " + alumna);
}
saludar(alumna);

function Sumar(num1, num2) {
  let sumar; //scope local -> solo vive dentro de la funcion
  sumar = num1 + num2;
  console.log(suma);
}

function Restar(a, b) {
  let resta = a - b;

  return resta;
}
let resultadoResta = Restar(4, 6);

console.log(resultadoResta);

const Dividir = (c, d) => {
  if (d === 0) {
    alert("no se puede dividir x 0");
  } else {
    let resultado = c / d;
    console.log(resultado);
  }
};

// funcion flecha o Arrow function
() => {}; //funcion anonima

Dividir(8, 2);

let perrenques = [
  "firu",
  "sultan",
  "charly",
  "cinco",
  "blanca",
  "tomate",
  "doky",
  "roña",
];

//let nombrePerro = prompt("como se llama tu perrenque")

const buscarPerrenque = (nombrePerro, perrenques) => {
  // for (let i = 0; i < perrenques.length; i++) {
  //     // if (nombrePerro === perrenques[i]) {
  //     //     alert("tu perrenque esta en nuestra base de datos")
  //     // }else{
  //     //     alert("nunca llego")
  //     // }
  //     nombrePerro === perrenques[i] ? alert("tu perrenque esta en nuestra base de datos"):  alert("nunca llego")
  // }

  let resultadoBusqueda = perrenques.find((perrito) => perrito === nombrePerro);
  //console.log(resultadoBusqueda);
  //resultadoBusqueda ? alert("tu perrenque esta en nuestra base de datos") : alert("nunca llego")
};

//buscarPerrenque(nombrePerro,perrenques)

// funcion con valor x defecto
const Despedirse = (nombre = "facundo") => {
  console.log("adios " + nombre);
};

Despedirse();
Despedirse("ivan");

let numeros = [4, 12, -10, 18, 42, 78, -5, 0, 35];

//funcion para mostrar la suma total de mis numeros y ordenar ese array

// const SumarYOrdenar = (numeros) => {
//   let acumulador = 0;
//   let impares = [];
//   let numOrdenados = numeros.sort((a, b) => a - b);
//   console.log(numOrdenados);

//   // acumulador += num
//   numeros.map((num) => (acumulador = acumulador + num));
//   console.log("el total es de :" + acumulador);

//   let numImpares = numeros.map((num) => num % 2 == 0);
//   //impares.push(numImpares)
//   console.info(numImpares);
// };

//foreach vs map

// SumarYOrdenar(numeros);

// Math.floor(Math.random(10 - 1) * 1);

// // const multiplicar = (a,b) => a*b es una sola linea pero solo hace 1 cosa
// const multiplicar = (a, b) => {
//   a * b;
//   b > 10 && alert("b es mayor  a10");
// };

//Objetos;

//objeto clase
// class Persona {
    
//     }

//     ()=>{}
// }

// const alumno extends Persona


//objeto literal

let nombre = "raul";
let apellido = "politi";

let Docente = {
  nombre: "raul",
  apellido: "politi",
  edad: 30,
  telefono: 3814222111,
  Casado: false,
  materias: [
    "programacion 2",
    "programacion 3",
    "base de datos",
    "laboratorio",
  ],
  hobbie: {
    nombreHobbie: "futbol",
    cantHs: 2,
    DireccionHobbie: "complejo ojo de agua",
  },
  mascotas: [
    {
      nombreMascota: "paco",
      raza: "salchicha furiosa",
      edadMascota: 7,
      vacuna:[{
        nombreVacuna: "picosin2025",
        dosis:"200ml",
        radioactividad:false,

      },{
        nombreVacuna: "sputnikB12",
        dosis:"400ml",
        radioactividad:true,
      }]
    },
    {
      nombreMascota: "mike",
      raza: "tortugon",
      edadMascota: 150,
    },
    {
      nombreMascota: "azrael",
      raza: "gato",
      edad: 4,
    },
  ],
  dormir:()=>{console.log("ZzzZZZzzZZZZzzzZ")},
  enseña:()=>{console.log("🥼");}
};

console.log("la edad del docente es de: "+Docente.edad);

Docente.dormir()

console.log(Docente.mascotas.length)

//quiero saber si el docente tiene una mascota llamada tito

for (let i = 0; i < Docente.mascotas.length; i++) {
    // Docente.mascotas[i].nombreMascota === "tito" ? console.log("si tienes una mascota llamada tito"): null
    Docente.mascotas[i].nombreMascota === "azrael" && console.log("si tienes una mascota llamada azrael")
    
}