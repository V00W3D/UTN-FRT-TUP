import React from 'react'
import Header from '../components/Header'
import MainPersonajes from '../components/Main/MainPersonajes'
import Footer from '../components/Footer'

const Personajes = () => {
  return (
    <div className='text-center'>
        <Header />
        <MainPersonajes/>
        <Footer/>
    </div>
  )
}

export default Personajes