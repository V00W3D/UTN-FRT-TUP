import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authStore from '../../store/authStore'

const MainLogin = () => {

    const {loginUser} = authStore()

    const navigate = useNavigate()

    const [usuario,setUsuario] = useState("")
    const [pass,setPass] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(usuario==="raul"&&pass==="123"){
            alert("bienvenido jefe")
            navigate("/personajes")
            loginUser("token")
        }else {
            alert("usuario not found")
        }
        e.target.reset()

    }

  return (
    <div>
        <br />
        <h3>Logueate</h3>
        <br />
        <form action="" className='form' onSubmit={handleSubmit}>
            <label htmlFor="">usuario</label>
            <input type="text" placeholder='' required className='' onChange={(e)=>setUsuario(e.target.value)}/>
            <br />
            <label htmlFor="">password</label>
            <input type="password" placeholder='' required  onChange={(e)=>setPass(e.target.value)}/>
            <br />
            <button type='submit' className='btn btn-primary'>login</button>
        </form>
        <br />
        <br />
   
    </div>
  )
}

export default MainLogin