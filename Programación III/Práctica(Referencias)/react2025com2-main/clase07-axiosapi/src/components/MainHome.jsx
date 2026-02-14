import React, { useEffect, useState } from 'react'
import Gallery from './Gallery'
import Skeleton from './Skeleton'
import { BASE_URL_CHARACTERS } from '../constants/constants'
import axios from "axios"

const MainHome = ({ valor }) => {


  const [personajes, setPersonajes] = useState([])
  const [loading, setLoading] = useState(true)
  const [prev, setPrev] = useState("")
  const [next, setNext] = useState("")

  const getBusqueda = async () => {
    console.log("disparo busqueda");

    try {
      let response = await axios.get(`${BASE_URL_CHARACTERS}/?name=${valor}`)
      console.log(response.data);
      setPersonajes(response.data.results)
      setLoading(false)
      setNext(response.data.info.next)
      setPrev(response.data.info.prev)
    } catch (error) {
      console.error(error.message)
    }


  }

  const getPersonajes = () => {
    fetch(BASE_URL_CHARACTERS)
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp.results);
        setPersonajes(resp.results)
        setLoading(false)
        setNext(resp.info.next)
      setPrev(resp.info.prev)
      })
      .catch(err => console.error(err))
  }


  const handlePrev =async () => {
    let response = await axios.get(prev)
    setPersonajes(response.data.results)
    setNext(response.data.info.next)
      setPrev(response.data.info.prev)
  }
  const handleNext =async () => {
    console.log("disparo next");
    let response = await axios.get(next)
    console.log(response);
    setPersonajes(response.data.results)
    setNext(response.data.info.next)
      setPrev(response.data.info.prev)
  } 

   const handleUltimo = async() =>{
    let response = await axios.get("https://rickandmortyapi.com/api/character?page=42")
    console.log(response);
    setPersonajes(response.data.results)
    setNext(response.data.info.next)
      setPrev(response.data.info.prev)
   }
  useEffect(() => {
    !valor ? getPersonajes() : getBusqueda()


  }, [valor])



  return (
    <>
      <div className='grid grid-cols-2 xs:grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
        {loading ? <Skeleton /> : personajes.map(personaje => <Gallery key={personaje.id} {...personaje} />)}


      </div>
      {prev && <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handlePrev}>anterior</button>}
      {next  && <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleNext}>siguiente</button>}
      
      <button type='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleUltimo}>ultima</button>
    </>

  )
}

export default MainHome