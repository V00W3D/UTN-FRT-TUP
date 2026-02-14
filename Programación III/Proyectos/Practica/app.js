const profesor = {
    nombre: "Raul Politi",
    edad: 40,
    asignaturas: ["programacion I", "programacion II", "programacion III"],
    mascotas: [{
        nombre: "paco",
        raza: "salchicha",
        ladrar: () => {"guau guau"}
    },{
        nombre: "uwu",
        raza: "felina",
        maullar: () => {"miauuuu"}
    },{        
    }],
    enseñar: () => {"enseñando"}
}
RazasContador = 0

for(razaSeleccionada of profesor.mascotas){
    if (razaSeleccionada.raza !== null){
        RazasContador ++
        console.log(razaSeleccionada.raza);
    }
}

















//========================================================================//
//como tomar el valor de un input
document.getElementById("formulario").addEventListener("submit", (event) => {
event.preventDefault(); // Evita que el formulario se envíe
    const input = document.getElementById("nombre").value
    console.log(input);
    alert(`Hola ${input}`);
}    
)
//========================================================================//
// Que es una promesa
// (dame 3 opciones ligeramente incorrectas y dame una correcta)   
// 1) Una promesa es un objeto que representa la finalización o el fracaso de una operación asíncrona
// 2) Una promesa es un objeto que representa la finalización o el fracaso de una operación sincrona
// es una accion que puede tener exito, fallar o quedar pendiente, luego, permite realizar acciones dependiendo del resultado de la operación

//========================================================================//
// Que es fetch
// Fetch es una API de JavaScript que permite hacer peticiones HTTP(GET, POST, PUT, DELETE)
// que es AXIOS
// AXIOS es una libreria de JavaScript que permite hacer peticiones HTTP(GET, POST, PUT, DELETE)

//========================================================================//

// Que es DOM

//DOM = Document Object Model
//Ejemplos:
//document.getElementById("id")
//document.getElementsByClassName("clase")
//document.getElementsByTagName("tag")
//document.querySelector("selector")

//========================================================================//

// Cómo se pone un array?
// Ejemplo:
profesor.nombre[0] = "Raul Politi"

//========================================================================//

// Cómo hacer que un boton sea clickeable [getElement... ("btn")... ] *Algo así*
//document.getElementById("btn").addEventListener("click", function(){})

//========================================================================//

// Diferencia entre obj lit y json
// JSON solo guarda datos y no funciones, un objeto literal puede guardar funciones y datos
const objeto_literal = {
    propiedades: "puede almacenar atributos",
    metodos: "puede almacenar funciones",
    propiedades2: "puede almacenar instancias a otros objetos",
}

// JSON = JavaScript Object Notation
// Es un formato de intercambio de datos
// Es un objeto de texto plano
// Se puede convertir a un objeto de JavaScript
const objeto_json = {
    "propiedades": "puede almacenar atributos",
    "array": [1, 2, 3, 4, 5],
    "objeto": {
        "propiedad1": "valor1",
        "propiedad2": "valor2"
    }
}

// const handleclick = () => {
// alert(`{input}`)
// }