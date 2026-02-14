//array - coleccion de objetos o cosas datos

//string[] nombres = new string[5];//array de 5 posiciones para strings

//let nombres = new Array

let nombres = [];

nombres[0] = "raul"
nombres[1] = "solana"
nombres[2] = "victor"


//console.info(nombres) 

//console.log("el largo del array es de "+nombres.length)

nombres[nombres.length] = "bautista"

//console.log(nombres)

for (let indice=0;indice<nombres.length;indice++) {
    //console.log(nombres[indice])
}


let contador = 0;
//mientras
while (contador<nombres.length) {
    //console.log(nombres[contador]);
   contador = contador+1
}

//push -> empujar o agregar al final del array

nombres.push("luciana")

for (const item of nombres) {
    //console.log(item)
}

//pop -> borra el ultimo agregado

nombres.pop()



//nombres.shift("tomas")



nombres.unshift("rodolfo")
console.log(nombres);


let numeros = [4,12,2,9,5]

//metodo burbuja

//let nuevoArray = numeros.sort()
console.log(numeros.sort())


let mezclaDatos = ["valeria",-10.2,true,undefined,null]

let meses = ["enero","febrero","marzo"]
let cantDias = [31,28,30]

for (let i = 0; i < meses.length; i++) {
    //console.log("el mes de "+meses[i]+ "tiene "+cantDias[i]+"dias")

    //interpolacion o bacticks alt + 96 
    //console.log(`el mes de ${meses[i]} tiene ${cantDias[i]} dias`)

}

//let saludo = prompt()

//console.log("hola "+saludo);

//let numero1 = parseInt(prompt("ingresa el 1er numero"))
//let numero2 = parseInt(prompt("ingresa el 2do numero"))

//let suma = numero1+numero2

//console.log(suma);


let arrayJuntos = numeros.concat(cantDias)
//console.log(arrayJuntos);


let secretaria = "solana"

console.log(secretaria.indexOf("l"))

let bandera=false
if (secretaria.includes("o")) {
    bandera=true
}else {
    bandera=false
}
if(bandera){
    //alert("si se encontro esa letra O")
}

//console.log(secretaria.length)

for (let i = 0; i < secretaria.length; i++) {
    if (secretaria[i] === "z") {
        alert("si existe la letra L y esta en la posicion num "+(i+1))
    }
    
}
//if ternario 
secretaria.includes("a") ? console.log("si se encuentra la letra") : console.log("no se encuentra");

console.log(arrayJuntos.includes(2))
//metodo filter() some() find() 

//console.log(arrayJuntos.filter(num=>num<10))

let gatitos = ["chatran","blanquita","garfield","naranjoso","satanas","garfield"]

//console.log(gatitos.includes("garfield"))

let nuevosGatos = gatitos.filter(gatito=>gatito==="garfield")
////console.log(nuevosGatos);

let Alumno = "ricardo"

console.log(Alumno.split("a"))


let NuevoAlumno = "    cristian     "
console.log(NuevoAlumno)

let alumnoSinEspacios = NuevoAlumno.trim().toUpperCase()
console.log(alumnoSinEspacios);

let discurso = "     el 20 de junio es ñ el dia de la bandera    "

let discursoNuevo = discurso.split("ñ")
console.log(discursoNuevo);

let arrayizquierda = discursoNuevo[0]
let arrayderecha = discursoNuevo[1]

let discursoFinal = arrayizquierda.concat(arrayderecha).trim()
console.log(discursoFinal);


gatitos.forEach(gatito=>console.log(gatito))

//metodos para recorrer o iterar ARRAYS en JS
// for - for of - for in - forEach - map

function Suma (parametros) {
    //acciones
}

const restar = (params) =>{
    //acciones
}
