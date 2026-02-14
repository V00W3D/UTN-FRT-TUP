const perritos = ["sultan", "toby", "clarita", "paco", "firu"];

//for for of  for in foreach map

for (const perro of perritos) {
  //console.log(perro);
  document.getElementById("listado").innerHTML += `
    <li>${perro}</li>
    `;
}
//alt + 96
// let comision = 9
// console.log("hola alumnos de la comision: "+comision);
// console.log(`hola alumnos de la comision ${comision}`);

const Alumnos = [
  {
    id: 1,
    nombre: "ruben",
    apellido: "cabanellas",
    edad: 42,
    casado: false,
  },
  { id: 2, nombre: "luciana", apellido: "carrizo", edad: 20, casado: false },
  {
    id: 3,
    nombre: "leo",
    apellido: "messi",
    edad: 36,
    casado: true,
  },
  { 
    id: 4, 
    nombre: "victor", 
    apellido: "navarro", 
    edad: 25, 
    casado: false 
}
];


const handleSubmit =(e) =>{
    console.log(e);
    e.preventDefault()
    //tengo que tomar los valores de los inputs
    
    //limpiar mi formulario
    document.getElementById("datosAlumnos").innerHTML = ""

    let nombresinVerificar = document.getElementById("nombre").value

    let nombre = nombresinVerificar.toLowerCase()
    let apellido = document.getElementById("apellido").value
    let edad = document.getElementById("edad").value
    let casado = document.getElementById("casado").checked
    //console.log(nombre+apellido+edad+casado);

    //creop un nuevo objeto para guardar los valores de los inputs
    let nuevoAlumno = {
        id: Alumnos.length + 1,
        nombre: nombre,//ambiguedad
        apellido,
        edad,
        casado
    }

    //validar datos
    if (nombre==="" || apellido==="" ||edad==="" ) {
        alert("debes completar todos los campos requeridos")
    }else {
        //luego guardarlos en un array 
        Alumnos.push(nuevoAlumno)
        //mostrar esos nuevos valores de mi array
        getAlumnos()
        //limpiar inputs x medio de funcion de evento
        //o x medio de vaciado de inputs 
        //e.target.reset()
        limpiarInputs()
    }


    
    
} 

const  limpiarInputs = () =>{
    document.getElementById("nombre").value = ""
     document.getElementById("apellido").value = ""
      document.getElementById("edad").value = "" 
        document.getElementById("casado").checked = false
}

function getAlumnos(){

    for (const alumno of Alumnos) {
        document.getElementById("datosAlumnos").innerHTML += `
        <tr>
            <td>${alumno.id}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.apellido}</td>
            <td>${alumno.edad}</td>
            <td>${alumno.casado === true ? "casado" : "solterito"}</td>
            
        </tr>
        `
    }
    //el formulario tiene un evento x defecto que es el SUBMIT
    
}
getAlumnos()

//getElemntByClassName o getElemntquerySelectro
document.getElementById("formulario").addEventListener("submit",handleSubmit)

console.log(Alumnos);


//consumiendo una API
//funcion para consumir una api 

const getDatos = () =>{

    //metodo fetch de js para consumir apis
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(resp=>resp.json()) //resolviendo una promesa
    .then(resultado=>console.log(resultado.drinks[0].strDrinkThumb
    ))
}

getDatos()

let gatitos = ["michifuz"]


