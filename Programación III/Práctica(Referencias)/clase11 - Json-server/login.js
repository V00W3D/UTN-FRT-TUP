

const handleSubmit = async (e) =>{
    e.preventDefault()

   let usuario =  document.getElementById("usuario").value
   let password = document.getElementById("password").value

    if (usuario === "" & password === "") {
        alert("debes ingresar los datos")
    }else {

        let response = await fetch("http://localhost:3001/usuarios")
        let datos = await response.json()

        console.log(datos);

       
        //filter() some() find()
        let usuarioFiltrado = datos.find(user=>user.usuario===usuario && user.password===password)
        console.log(usuarioFiltrado);

        if (usuarioFiltrado.rol === "admin") {
            alert("administrador")
            window.location.href = "./productos.html"
            //logica del administrador
            //CRUD
        }else if (usuarioFiltrado.rol === "cliente") {
            alert("usuari normal")
            //logica del usuario normal
        }else {
            alert("no hay ningun usuario")
        }
    }

}


document.getElementById("formulario").addEventListener("submit",handleSubmit)



// sangucheria
// usuarios 
// productos
// empleados
// clientes
// cadetes
// menu


// ferreteria
// usaurios
// productos
// empleados
// clientes
// proveedores
// facturacion





