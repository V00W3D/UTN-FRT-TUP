import HomePage from "./pages/HomePage"
import './App.css'

function App() {

let nombre = "Matias"

  return (
    <>
      <h1>Hola Mundo</h1>
      <HomePage nombre={nombre} />
    </>
  )
}

export default App
