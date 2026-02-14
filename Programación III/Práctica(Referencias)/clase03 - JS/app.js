console.log("hola mundo");


let nombre =  "raul"
const edad = 40
var ocupacion = "docente" 

const pi = 3.14159596


// tipo de datos
// boleanos -> true o false
// numericos -> 0 210 -500
// string -> "hola mundo"
// arrays -> [1,false,"chocolate",0.1+0.2,]
// objetos 
// objeto literal 
// -> {nombre:"raul",edad:40,ocupacion:"docente"}
// objeto clase
// class Persona {
//     get {}

//     set {}
// }

let nombreAlumno = "camila"

let edadAlumno = 10

let soltera = false

let number1 = 12
let number2 = "12"



//IF comun
if (edadAlumno>18) {
    //alert("camila es mayor")
}else {
    //alert("camila es menor de edad")
}
//IF ternario

soltera  ? console.log("camila no quiere compromiso") : console.log("camila esta casada")


let numeroNuevo = parseInt(number2)

console.log(number1+numeroNuevo);

// = -> asigno un valor
// == -> compara el valor
// === -> compara x tipo y valor
if (number1 === number2) {
    console.log("son iguales");
}else {
    console.log("no son iguales");
}

//alert(edadAlumno < 20 ? "es menor" : "es mayor")


let perritos = ["firulais","toby","sultan","blanquita"]

//console.log(perritos);



for (let i=0;perritos.length;i++) {
    console.log(perritos[i]);
}

