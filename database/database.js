// Permite interagir com diferentes bancos de dados
const Sequelize = require("sequelize")

const connection = new Sequelize(
    "guiaperguntas", 
    "root", 
    "root", {
    host: "localhost",
    dialect: "mysql"
})
/* Incluir mais para frente as variáveis de ambiente
const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_SGBD
})
*/
module.exports = connection