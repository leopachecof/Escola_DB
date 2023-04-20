



const { DataTypes } = require("sequelize");
const { connection } = require("./database");
const Turma = require("./turma");
const Professor = connection.define("professor", {

    nome: {
        // nome VARCHAR NOT NULL
        type: DataTypes.STRING(130),
        allowNull: false, // NOT NULL
      },
      email: {
        // 
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      telefone: {
        // telefone VARCHAR NOT NULL
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

// Relacionamento 1:1 (Um Professor pode ter 1 turma)
Turma.hasOne(Professor, { onDelete: "CASCADE" });
// CASCADE = quando um cliente for deletado, TODOS os pets serão deletados
Professor.belongsTo(Turma); // Um pet pertece a um cliente

module.exports = Professor;
