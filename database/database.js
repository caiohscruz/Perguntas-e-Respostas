// Permite interagir com diferentes bancos de dados
const Sequelize = require("sequelize")

// Setando variáveis de ambiente com dotenv
require('dotenv/config');

const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

module.exports = connection