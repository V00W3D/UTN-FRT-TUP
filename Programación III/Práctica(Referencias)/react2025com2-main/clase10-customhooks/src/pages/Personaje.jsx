import React from 'react'
import Header from '../components/Header'
import MainPersonaje from '../components/Main/MainPersonaje'
import Footer from '../components/Footer'

const Personaje = () => {
  return (
    <div className='text-center'>
        <Header/>
        <MainPersonaje/>
        <Footer/>
    </div>
  )
}

export default Personaje