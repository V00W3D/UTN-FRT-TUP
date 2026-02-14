const MONGOOSE = require("mongoose")

const connection = async ()=>{
    try {
        await MONGOOSE.connect('mongodb://26.51.56.75:27017/mensajeria')
        console.log("(mongoose) hola"); 
    } catch (error) {
        console.log("(mongoose) error, anda sabe pokhe");
    }
}

module.exports = connection