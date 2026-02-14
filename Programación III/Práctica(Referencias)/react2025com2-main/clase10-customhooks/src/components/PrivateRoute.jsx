import authStore from "../store/authStore"
import {Outlet,Navigate} from "react-router-dom"

const PrivateRoute = () => {

    const {user} = authStore()

  return user ? <Outlet/> : <Navigate to={"/"}/>
}

export default PrivateRoute