// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Turma = require("./turma");
const Aluno = connection.define("aluno", {
  // Configurar a coluna 'nome'
  nome: {
    // nome VARCHAR NOT NULL
    type: DataTypes.STRING(130),
    allowNull: false, // NOT NULL
  },
  email_responsavel: {
    // email VARCHAR UNIQUE NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  telefone_responsavel: {
    // telefone VARCHAR NOT NULL
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relacionamento 1:N (Um cliente pode ter N pets)
Turma.hasMany(Aluno, { onDelete: "CASCADE" });
// CASCADE = quando um cliente for deletado, TODOS os pets serão deletados
Aluno.belongsTo(Turma); // Um pet pertece a um cliente

module.exports = Aluno;