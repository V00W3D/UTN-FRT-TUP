import React from 'react'
import useStore from '../store/useStore'

const Bisnieto1 = () => {

    const {nombre,telefono,apellido} = useStore()

  return (
    <div>
        <br />
        <h3>
            datos: {nombre} {apellido} {telefono}
        </h3>
    </div>
  )
}

export default Bisnieto1