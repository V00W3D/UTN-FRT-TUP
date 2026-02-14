const MYSQL = require('mysql2')
const connection = MYSQL.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ferreteriagrupo4com9"
}
)

connection.connect((error)=>{
    if (error) throw error;
    console.log("(MySQL) Ferreteria haciendo Fierros! :D")
})

module.exports = {connection}