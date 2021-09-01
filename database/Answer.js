const Sequelize = require("sequelize")
const connection = require("./database")

/* Cria a estrutura da tabela. STRING < TEXT */
const Answer = connection.define("Answers",{
    body:{
        type: Sequelize.TEXT,
        allownull : false
    },
    questionId:{
        type: Sequelize.INTEGER,
        allownull: false
    }
})
/* Trecho para sincronizar a tabela, criando-a caso não exista
    force "false" para não criar uma tabela caso já exista - CREATE */
Answer.sync({force: false})

module.exports = Answer