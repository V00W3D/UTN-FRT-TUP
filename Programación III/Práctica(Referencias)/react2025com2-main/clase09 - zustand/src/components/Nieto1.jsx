import React from 'react'
import useStore from '../store/useStore'

const Nieto1 = () => {

    const {contador} = useStore()
  return (
    <div>
        <h3>contador en: {contador}</h3>
    </div>
  )
}

export default Nieto1