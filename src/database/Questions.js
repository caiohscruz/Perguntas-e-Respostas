
const Sequelize = require("sequelize")
const connection = require("./database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Questions = connection.define("Questions",{
    title:{
        type: Sequelize.STRING,
        allownull : false
    },
    description:{
        type: Sequelize.TEXT,
        allownull: false
    }
})
/* Trecho para sincronizar a tabela, criando-a caso não exista
    force "false" para não criar uma tabela caso já exista - CREATE*/
Questions.sync({force: false})

module.exports = Questions