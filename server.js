// Setando o express
const express = require("express")
const app     = express()

// Componente necessário para capturar valores do formulário
const bodyParser = require("body-parser")

// Setando conexão com o banco de dados
const connection = require("./database/database")

// Mapeando a tabela Questions
const Question = require("./database/Question")

// Mapeando a tabela Answers
const Answer = require("./database/Answer")

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
app.get("/", async (req, res) => {
    // SELECT - raw true para não trazer elementos desnecessarios do bd
    // ASC/DESC - crescente ou decrescente
    await Question.findAll({
        raw: true, 
        order:[
            ['id', 'DESC']
        ]}).then(questions => {
            res.render("index", {
                questions : questions,
                page : "home"
            })
        })
    })
    
    // Rota para a página de fazer pergunta
    app.get("/question/:id", async (req, res) => {
        var id =  req.params.id
        await Question.findOne({
            where:{id: id}
        }).then(async question => {
            if (question != undefined){
                // Pergunta encontrada
                await Answer.findAll({
                    where: {questionId: id},
                    raw: true, 
                    order:[
                        ['id', 'DESC']
                    ]}).then(answers => {
                        res.render("question", { 
                            question : question,
                            answers: answers,
                            page : "question"
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
            res.render("newquestion", { page : "newquestion"})
        })
        
        // Rota para a página de pergunta salva
        app.post("/save-question", async (req, res) => {
            var title = req.body.titulo
            var description = req.body.descricao
            // INSERT
            await Question.create({
                title: title,
                description : description
            }).then(()=> {
                res.redirect("/")
            })
        })
        
        // Rota para a página de pergunta salva
        app.post("/save-answer", async (req, res) => {
            var body = req.body.answerBody
            var questionId = req.body.questionId
            // INSERT
            await Answer.create({
                body: body,
                questionId : questionId
            }).then(()=> {
                res.redirect("/question/"+questionId)
            })
        })
        
        app.listen(8081, ()=>{console.log("Testing...")})