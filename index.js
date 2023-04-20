//pet= alunos
//endereço = professores
//cliente = turma

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

// Configuração do App
const app = express();
app.use(express.json()); // Possibilitar transitar dados usando JSON
app.use(morgan("dev"));


// Configuração do Banco de Dados
const { connection, authenticate } = require("./database/database");
authenticate(connection); // efetivar a conexão

//
const swagger = require("./swagger");
swagger(app);


// Definição de rotas
const rotasTurmas = require("./routes/turmas");
const rotasAlunos = require("./routes/alunos");
const rotasProfessores = require("./routes/professores");

//Configurar o grupo de rotas no app
app.use(rotasTurmas);
app.use(rotasAlunos);
app.use(rotasProfessores);


// Escuta de eventos (listen)
app.listen(3000, () => {
  // Gerar as tabelas a partir do model
  // Force = apaga tudo e recria as tabelas
  connection.sync();
  console.log("Servidor rodando em http://localhost:3000/");
});