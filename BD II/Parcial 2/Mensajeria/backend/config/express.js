const EXPRESS = require("express")
const CORS = require("cors");

const APP = EXPRESS()
APP.use(EXPRESS.json())
APP.use(CORS())

const APPlisten = ()=>{
    const port = 8000
    APP.get("/", (req,res)=>{
        res.send({message: "hola"})
    })

    APP.listen(port,"0.0.0.0" ,()=>{
        console.log("(Express) iniciado en puerto " + port);
    })
}

module.exports = {APP,APPlisten}