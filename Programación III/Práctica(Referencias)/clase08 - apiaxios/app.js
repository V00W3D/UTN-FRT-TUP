const RANDOM_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
//fetch()

//axios biblioteca para realizar peticiones http
//https://axios-http.com/es/docs/intro

const traerDatos = () => {
  //consumir la api de tragos
  fetch(RANDOM_URL)
    .then((resp) => resp.json())
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally();
};

//traerDatos()
// function getData () {

// }

const getData = async () => {
  try {
    let response = await fetch(RANDOM_URL);
    let result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

//getData();

const tragoRandom = async () => {
  try {
    let response = await axios.get(RANDOM_URL);
    console.log(response.data.drinks[0]);

    let nombre = response.data.drinks[0].strDrink;
    let id = response.data.drinks[0].idDrink;
    let imagen = response.data.drinks[0].strDrinkThumb;
    let instrucciones = response.data.drinks[0].strInstructions;
    document.getElementById("tragos").innerHTML = `


    <div class="card m-auto border" style="width: 18rem;">
    <img src=${imagen} class="card-img-top" alt="..." style="width: 100px;height: 100px;">
    <div class="card-body">
      <h5 class="card-title">${id} - ${nombre}</h5>
      <p class="card-text">instrucciones: ${instrucciones}</p>
      <a href="#" class="btn btn-primary">ver trago</a>
    </div>
  </div>


`;
  } catch (error) {
    console.log(error);
  }
};
tragoRandom();

//https://http.cat/ errores de peyticiones http


const buscarTrago = async (e) =>{
    e.preventDefault()
    let tragoBusqueda = document.getElementById("trago").value

     

    if (tragoBusqueda === "") {
        alert("debes ingresar un trago")
    }else {
        let response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+tragoBusqueda)
        console.log(response.data.drinks);
    
        let tragos = response.data.drinks
    
    
        
    
    
        tragos.forEach(trago => {
    
    
        document.getElementById("tragos").innerHTML = `
            
        <div class="card m-auto border" style="width: 18rem;">
        <img src=${trago.strDrinkThumb} class="card-img-top" alt="..." style="width: 100px;height: 100px;">
        <div class="card-body">
          <h5 class="card-title">${trago.idDrink} - ${trago.strDrink}</h5>
          <p class="card-text">instrucciones: ${trago.strInstructions}</p>
          <a href="#" class="btn btn-primary">ver trago</a>
        </div>
      </div>
            `
        });
    }

    

}

buscarTrago()


document.getElementById("formulario").addEventListener("submit",buscarTrago)