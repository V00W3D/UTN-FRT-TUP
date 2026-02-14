import React from 'react'
import { useParams } from 'react-router-dom'

const MainContact = () => {

    const {id} = useParams()

  return (
    <div>
        <br />
        <h2>Contact Me</h2>
        <br />
        <h3>el elemento que viene en mi ruta es {id}</h3>
        <br />
    </div>
  )
}

export default MainContact