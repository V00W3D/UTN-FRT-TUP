import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'

const router = createBrowserRouter([{
path:"/",
element:<Home/>,
errorElement:<h3>no hay nada</h3>
},{
  path:"/register",
  element:<Register/>,
  errorElement:<h3>no hay nada</h3>
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
  // <RouterProvider router={router}/>
)
