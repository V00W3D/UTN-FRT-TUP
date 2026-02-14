import React from 'react'
import Header from '../componnets/Header'
import MainHome from '../componnets/MainHome'
import { Footer } from '../componnets/Footer'
import { lengProg } from '../data/config'

const Home = () => {


  return (
    <div>
        <Header />
        <MainHome lengProg={lengProg}/>
        <Footer />
    </div>
  )
}

export default Home