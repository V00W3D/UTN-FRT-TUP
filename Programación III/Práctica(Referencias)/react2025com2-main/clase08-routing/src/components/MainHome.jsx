import React from 'react'
import {Button} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'

const MainHome = () => {

    const navigate = useNavigate()

    const handleClick = () =>{
        //window.location.href = "/contact"
        navigate("/contact")
       
    }

  return (
    <div>
        <br />
        <h3>probando router-dom</h3>
        <br />
        <Button onClick={handleClick}>viajar a contac me</Button>
    </div>
  )
}

export default MainHome