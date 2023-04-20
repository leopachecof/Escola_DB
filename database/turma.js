// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade vira uma coluna da tabela

// DataTypes = serve para definir qual o tipo da coluna
const { DataTypes } = require("sequelize");
const { connection } = require("./database");

const Turma = connection.define("turma", {
  // Configurar a coluna 'nome'
  nome: {
    // nome turma A, B, C
    type: DataTypes.STRING(130),
    allowNull: false, // NOT NULL
  },
  tipo: {
    // fundamental: 1 e 2; ensino médio
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  ano: {
    //  série 1, 2, 3
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relação professor e turma (1:1)
// Associação 1:1 (One-to-One)
// const Professor = require("./professor");

// Cliente tem um Endereço
// Endereço ganha uma chave estrangeira (nome do model + Id)
// Chave estrangeira = clienteId
// Turma.hasOne(Professor, { onDelete: "CASCADE" });

// Professor.belongsTo(Turma); // Endereço pertence a um Cliente

module.exports = Turma;
