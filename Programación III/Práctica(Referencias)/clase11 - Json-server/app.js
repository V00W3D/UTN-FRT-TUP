const pi = 3.14159598;
const URL_PRODUCTS = "http://localhost:3001/productos/";
const URL_USERS = "http://localhost:3001/usuarios/";
let ID = "";

const handleClick = async (id) => {
  //e.preventDefault()
  ID=id

  console.log("elimino un producto" + ID);
  let response = await axios.delete(URL_PRODUCTS + id);

  if (response) {
    alert("producto eliminado correctamente");
  } else {
    alert("algo malio sal");
  }
};

const handleEditar = (id, nombre, precio, cantidad, imagen) => {
  ID = id;

  console.log(id, precio, cantidad, nombre, imagen);

  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("cantidad").value = cantidad;
  document.getElementById("imagen").value = imagen;

  document.getElementById("agregar").style.display = "none";
  document.getElementById("actualizar").style.display = "block";
};

const getProducts = async () => {
  try {
    let response = await fetch(URL_PRODUCTS);
    let productos = await response.json();
    //console.log(productos);

    //document.getElementById("formulario-producto").style.display = "none"
    document.getElementById("actualizar").style.display = "none";

    for (const product of productos) {
      document.getElementById("tbody").innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.precio}</td>
            <td>${product.cantidad}</td>
            <td>${product.cantidad * product.precio}</td>
            <td><img src=${product.imagen} class="img-table"/></td>
            <td>
                <button class="btn btn-danger" onclick='handleClick(${
                  product.id
                })'>eliminar</button>
                <button class="btn btn-warning" onclick="handleEditar(${
                  product.id
                },'${product.nombre}',${product.precio},${product.cantidad},'${
        product.imagen
      }')">editar</button>
                <button type="button" class="btn btn-success" onclick="handleVer(${
                  product.id
                },'${product.nombre}',${product.precio},${product.cantidad},'${
        product.imagen
      }')">ver</button>
            </td>
        </tr>
        `;
    }
  } catch (error) {
    console.error(error);
  }
};

getProducts();

const handleSubmit = async (e) => {
  console.log(e);
  e.preventDefault();
  console.log("disparo formulario de producto");

  let nombre = document.getElementById("nombre").value;
  let cantidad = document.getElementById("cantidad").value;
  let precio = document.getElementById("precio").value;
  let imagen = document.getElementById("imagen").value;

  try {
    let response = await axios.post(URL_PRODUCTS, {
      nombre,
      cantidad: parseInt(cantidad),
      precio: parseInt(precio),
      imagen,
    });

    if (response) {
      alert("producto agregado correctamente");
    } else {
      alert("error al agregar producto");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCard = () => {
  document.getElementById("card").style.display = "none";
  document.getElementById("tabla").style.display = "block";
};

const handleVer = (id, nombre, precio, cantidad, imagen) => {
    ID = id
    document.getElementById("tabla").style.display = "none";
    document.getElementById("card").innerHTML = `
      <div class="col-md-12 text-center justify-content-center">
      <div class="card" style="width: 18rem;">
    <img class="card-img-top" src=${imagen} alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">#${ID} - ${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Precio: ${cantidad}</p>
      <button type="button" onclick="handleCard()" class="btn btn-primary">Volbver</button>
    </div>
  </div>
  </div>
      `;
};

document
  .getElementById("formulario-producto")
  .addEventListener("submit", handleSubmit);

const handleActualizar = async () => {
  let nombre = document.getElementById("nombre").value;
  let cantidad = document.getElementById("cantidad").value;
  let precio = document.getElementById("precio").value;
  let imagen = document.getElementById("imagen").value;

  try {
    let response = await axios.put(URL_PRODUCTS + ID, {
      nombre,
      cantidad,
      precio,
      imagen,
    });
    if (response) {
      alert("producto actualizado correctamente");
    } else {
      alert("ocurrio un error");
    }
  } catch (error) {
    console.log(error);
  }
};

document
  .getElementById("actualizar")
  .addEventListener("click", handleActualizar);
