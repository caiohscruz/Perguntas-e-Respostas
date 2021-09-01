// Setando o express
const express = require("express")
const app     = express()

// Componente necessário para capturar valores do formulário
const bodyParser = require("body-parser")

// Setando conexão com o banco de dados
const connection = require("./database/database")

// Conectando
connection
.authenticate()
.then( () => {
console.log("Conexão feita com o banco de dados")
})
.catch((msgErro) => {
    console.log(msgErro)
})

// Dizendo para o express que o EJS deve ser usado como View Engine
app.set('view engine', 'ejs')
// Para que o express reconheça imagens e CSS - public é o nome do diretorio
app.use(express.static('public'))

//
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

// Rotas

// Rota para a home
app.get("/", (req, res) => {
    res.render("index", { page : "home"} )
})

// Rota para a página de perguntas
app.get("/asking", (req, res) => {
    res.render("asking", { page : "asking"})
})

// Rota para a página de pergunta salva
app.post("/asking", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send(`Formulário recebido! ${titulo} ${descricao} "`)
})

app.listen(8081, ()=>{console.log("Testing...")})