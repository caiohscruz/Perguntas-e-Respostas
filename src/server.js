// Setando o express
const express = require("express")
const app     = express()
const path = require('path')

// Componente necessário para capturar valores do formulário
const bodyParser = require("body-parser")

// Setando conexão com o banco de dados
const connection = require("./database/database")

// Mapeando a tabela Questions
const Questions = require("./database/Questions")

// Mapeando a tabela Answers
const Answers = require("./database/Answers")

// Apresentará no console se a conexão transcorreu bem
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

app.set('views', path.join(__dirname, 'views'))

//
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

// Rotas

// Rota para a home
app.get("/", async (req, res) => {
    // SELECT - raw true para não trazer elementos desnecessarios do bd
    // ASC/DESC - crescente ou decrescente
    await Questions.findAll({
        raw: true, 
        order:[
            ['id', 'DESC']
        ]}).then(questions => {
            res.render("index", {
                questions : questions
            })
        })
    })
    
    // Rota para a página de fazer pergunta
    app.get("/question/:id", async (req, res) => {
        var id =  req.params.id
        await Questions.findOne({
            where:{id: id}
        }).then(async question => {
            if (question != undefined){
                // Pergunta encontrada
                await Answers.findAll({
                    where: {questionId: id},
                    raw: true, 
                    order:[
                        ['id', 'DESC']
                    ]}).then(answers => {
                        res.render("question", { 
                            question : question,
                            answers: answers
                        })
                    })
                }else{
                    // Pergunta não encontrada
                    res.redirect("/")
                }
            })
        })
        
        // Rota para a página de fazer pergunta
        app.get("/newquestion", (req, res) => {
            res.render("newquestion")
        })
        
        // Rota para a página de pergunta salva
        app.post("/save-question", async (req, res) => {
            var title = req.body.title
            var description = req.body.description
            // INSERT
            await Questions.create({
                title: title,
                description : description
            }).then(()=> {
                res.redirect("/")
            })
        })
        
        // Rota para a página de pergunta salva
        app.post("/save-answer", async (req, res) => {
            var description = req.body.description
            var questionId = req.body.questionId
            // INSERT
            await Answers.create({
                description: description,
                questionId : questionId
            }).then(()=> {
                res.redirect("/question/"+questionId)
            })
        })
        
        app.listen(process.env.PORT||8081, ()=>{console.log("Testing...")})