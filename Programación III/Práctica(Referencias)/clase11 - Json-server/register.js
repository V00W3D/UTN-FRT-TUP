const handleSubmit = async (e) => {
  e.preventDefault();

  let nombreCompleto = document.getElementById("nombre").value;
  let password = document.getElementById("password").value;
  let email = document.getElementById("email").value;

  if (nombreCompleto === "" && password === "" && email === "") {
    alert("debes completar los campos");
  } else {
    //debo utilizar POST para gusradar en mi DB
    //async y await manejo las promesas
    //.then() y .catch() tb manejo promesas

    // let response = await fetch("http://localhost:3001/usuarios")
    // let usuarios = await response.json()
    // console.log(object);
    try {
      let response = await axios.post("http://localhost:3001/usuarios", {
        usuario: nombreCompleto,
        password,
        email,
        rol: "user",
      });
      //console.log(response);

      if (response) {
        alert("usuario agregado correctamente");
        console.log("debo navegar a index");
        window.location.href = "./index.html";
      } else {
        alert("ups algo malio sal");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

document.getElementById("btn-form").addEventListener("click", handleSubmit);

//axios y fetch me sirven para realizar estas peticiones HTTP
// peticiones HTTP

// GET -> traer datos o obtener datos
// POST -> enviar o agergar datos
// PUT -> actualizar o editar esos datos
// DELETE -> para eliminar o borrar algun dato

// CRUD(create - read - update - delete)

// ABM(alta - baja - modificacion)


// {
//       "id": 1,
//       "nombre": "chocolate",
//       "precio": 2000,
//       "cantidad": 20,
//       "imagen": "https://thumbs.dreamstime.com/b/chocolate-54067353.jpg",
//       "descripcion": "",
//       "categoria": "snacks",
//       "stock": 20,
//       "marca": "chocolatina",
//       "fecha": "2022-01-01",
//       "codigo": "CHOC-001",
//       "proveedor": "chocolatina",
//       "precioVenta": 2500,
//       "precioCompra": 2000
//     },
//     {
//       "id": 2,
//       "nombre": "azucar",
//       "precio": 1500,
//       "cantidad": 50,
//       "imagen": "https://www.casa-segal.com/wp-content/uploads/2019/03/azucar-kilo-ledesma-reposteria-mendoza-casa-segal-1-600x600.jpg"
//     },
//     {
//       "id": 3,
//       "nombre": "yerba mate",
//       "precio": 1200,
//       "cantidad": 10,
//       "imagen": "https://depotexpress.com.ar/wp-content/uploads/2024/01/yerba_compuesta_500_3_c1-281a8ab.png"
//     }