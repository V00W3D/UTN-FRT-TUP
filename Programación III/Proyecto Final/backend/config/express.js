const CORS = require('cors')
const EXPRESS = require('express')

const APP = EXPRESS()
APP.use(EXPRESS.json())
APP.use(CORS())

const APPlisten = () =>{
    const PORT=8000
    APP.get("/",(req,res)=>{
        res.send({message: "UwU"})
    })
    
    APP.listen(PORT,()=>{
        console.log(`(Express) Ferreteria Corriendo en el fierro ${PORT}! :D`)
    })
}

module.exports = {APP,APPlisten}