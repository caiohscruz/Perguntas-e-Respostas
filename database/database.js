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
    process.env.DATABASE_NAME, 
    process.env.DATABASE_USERNAME, 
    process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_SGBD
})
*/
module.exports = connection