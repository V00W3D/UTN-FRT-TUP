const BASE_URL = 'https://rickandmortyapi.com/api/character/';
const PI = 3.14159598
let prev = ""
let next = ""
let ULTIMO = "https://rickandmortyapi.com/api/character?page=42"

const personajes = [{
    id:1,
    "nombre":"rick",
},{
    id:2,
    nombre:"morty"
}]



const getPersonajes = (url=BASE_URL) =>{
    fetch(url)
    .then(resp=>resp.json())
    .then(response=>{
        console.log(response.info)
        prev = response.info.prev
        next = response.info.next

        document.getElementById("row").innerHTML=""

        document.getElementById("prev").style.display = prev ? "block" : "none"
        document.getElementById("next").style.display = next ? "block" : "none"

        response.results.forEach(personaje=>document.getElementById("row").innerHTML += `
        <div class="col-4 d-flex justify-content-center mt-2 mb-2">
        <br><br>
        <div class="card mt-2" style="width: 18rem;">
            <img src=${personaje.image} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">#${personaje.id} - ${personaje.name}</h5>
                    <p class="card-text text-primary">genero: <span class="text-danger">${personaje.gender}</span></p>
                     <p class="card-text text-primary">especie: <span class="text-danger">${personaje.species}</span></p>
                      <p class="card-text text-primary">estado: <span class="text-danger">${personaje.status === "Alive" ? "Vivo": "Muerto"}</span></p>
                     <button type="button" class="btn btn-success" onclick="handleVer(${personaje.id})">ver mas</button>
                </div>
        </div>
        </div> 
        `)
    })
    .catch(error=>console.error(error))
}
getPersonajes()


const handleVer =async (id) => {
    document.getElementById("row").innerHTML = ""
let response = await axios.get(BASE_URL+id)
document.getElementById("row").innerHTML = `
<div class="col-12 d-flex justify-content-center mt-2 mb-2">
        <br><br>
        <div class="card mt-2" style="width: 18rem;">
            <img src=${response.data.image} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">#${response.data.id} - ${response.data.name}</h5>
                    <p class="card-text text-primary">genero: <span class="text-danger">${response.data.gender}</span></p>
                     <p class="card-text text-primary">especie: <span class="text-danger">${response.data.species}</span></p>
                      <p class="card-text text-primary">estado: <span class="text-danger">${response.data.status === "Alive" ? "Vivo": "Muerto"}</span></p>
                     <button type="button" class="btn btn-success" onclick="handleVolver()">volver</button>
                </div>
        </div>
        </div> 
`
}

const handleVolver = () =>{
    getPersonajes() 
}

const handleClick =() =>{
    console.log("disparo ver mas")
}


const handleUltimo =async() =>{
    document.getElementById("row").innerHTML=""
    getPersonajes(ULTIMO)

}

const handlePrev = () =>{
 document.getElementById("row").innerHTML=""
    getPersonajes(prev)

}

const handleNext = () =>{
    document.getElementById("row").innerHTML=""
    getPersonajes(next)
}

const handleBuscar =(e) =>{
    e.preventDefault()
    const input = document.getElementById("input").value

    if (input==="") {
        alert("debes buscar algo")
    }else {
        try {
            
            let newUrlBusqueda = "https://rickandmortyapi.com/api/character/?page=2&name="+input
            getPersonajes(newUrlBusqueda)
            e.target.reset()
        } catch (error) {
            console.log(error);
            alert("no hay ningun personaje llamado "+input)
        }
       
    }
     
    

}

document.getElementById("prev").addEventListener("click",handlePrev)
document.getElementById("next").addEventListener("click",handleNext)
document.getElementById("ultimo").addEventListener("click",handleUltimo)


document.getElementById("formulario").addEventListener("submit",handleBuscar)
