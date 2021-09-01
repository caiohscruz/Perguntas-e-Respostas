const express = require("express")
const app     = express()

// Dizendo para o express que o EJS deve ser usado como View Engine
app.set('view engine', 'ejs')
// Para que o express reconheça imagens e CSS - public é o nome do diretorio
app.use(express.static('public'))

// Rotas

app.get("/", (req, res) => {
    res.render("index", { page : "home"} )
})
app.get("/asking", (req, res) => {
    res.render("asking", { page : "asking"})
})

app.post("/save-question", (req, res) => {
    res.send("Formulário recebido!")
})

app.listen(8081, ()=>{console.log("Testing...")})