import axios from 'axios'
import { URL_API } from '../endpoints/api.endpoint' //se utiliza esta constante del router para seguir ocultando más la info de la api

//esta constante es la que se va a utilizar una sola vez teniendo como objeto la url base (que es el json-server)
const api = axios.create({
    baseURL: URL_API
})

export default api