import {useState,useEffect} from "react"
import { BASE_URL } from "../routes/rutas"
import axios from "axios"

export const useAxios =(endpoint) =>{

    const [datos, setDatos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const getApi =async() =>{
        try {
            let response = await axios.get(BASE_URL+endpoint)
            setDatos(response.data.items)
            //console.log(response.data);
            setLoading(false)
            setError(false)
        } catch (error) {
            console.log(error);
            setDatos([])
            setError(true)
        }
        
    }

    useEffect(()=>{
     getApi()
    },[endpoint])

    return [datos,loading,error]

}