import './App.css'
import HomePage from "./page/HomePage"

function App() {

let nombre = "Matias"
let edad = 29
let esDesarrollador = true


  return (

 <div>
  <h1>Hola mundo</h1>
  <HomePage nombre ={nombre} años = {edad} desarrollador = {esDesarrollador} />
 </div>

  )
}

export default App
