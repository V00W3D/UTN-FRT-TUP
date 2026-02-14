import React,{useState,useEffect} from 'react'
import {Row,Col} from "react-bootstrap"

const FetchRickMorty = () => {

    const [datos,setDatos] = useState([])

    const getApiData =async () => {
        // fetch("https://rickandmortyapi.com/api/character")
        // .then(res => res.json())
        // .then(resultado => {
            
        //     console.log(resultado)
        //     setDatos(resultado.results)
        // })
        let response = await fetch("https://rickandmortyapi.com/api/character")
        let result = await response.json()
        setDatos(result.results)
    }
    getApiData()
    //
    // useEffect(()=>{
      
    // },[])

    return (
        <div>
            <br />
            <h3>mostrando la api de rick y morty</h3>
            <br />
            <Row>
            {datos.map(dato=><Col>
            <h3>nombre: {dato.name}</h3>
            <img src={dato.image} alt="" width={50} height={50}/>
            </Col>)}
            </Row>
           
        </div>
    )
}

export default FetchRickMorty