const Turma = require("../database/turma");
const Professor = require("../database/professor");

const { Router } = require("express");

// Criar o grupo de rotas (/professor)
const router = Router();

//Lista de professores
router.get("/professores", async (req, res) => {
  const listaProfessores = await Professor.findAll();
  res.json(listaProfessores);
});

// Listar um determinado professor
router.get("/professores/:id", async (req, res) => {
  const { id } = req.params;

  const professor = await Professor.findByPk(id);
  if(professor) {
    res.json(professor);
  }
  else {
    res.status(404).json({ message: "Professor não encontrado." });
  }
});

//adicionar de Professor
router.post("/professores", async (req, res) => {
    const { nome, email, telefone, turmaId } = req.body;
  
    try {
      const turma = await Turma.findByPk(turmaId);
      if(turma) {
        const professor = await Professor.create({nome, email, telefone, turmaId});
        res.status(201).json(professor);
      }
      else {
        res.status(404).json({ message: "Professor(a) não encontrada." });
      }
    }
    catch(err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  //atualizar professor
  router.put("/professores/:id", async (req, res) => {
    // Esses são os dados que virão no corpo JSON
    const { nome, email, telefone, turmaId } = req.body;
  
    // É necessário checar a existência do Pet
    // SELECT * FROM professor WHERE id = "req.params.id";
    const professor = await Professor.findByPk(req.params.id);
  
    // se professor é null => não existe o pet com o id
    try {
      if (professor) {
        // IMPORTANTE: Indicar qual o professor a ser atualizado
        // 1º Arg: Dados novos, 2º Arg: Where
        await Professor.update(
          { nome, email, telefone, turmaId },
          { where: { id: req.params.id } } // WHERE id = "req.params.id"
        );
        // await pet.update({ nome, tipo, dataNasc, porte });
        res.json({ message: "O professor foi editado." });
      } else {
        // caso o id seja inválido, a resposta ao professor será essa
        res.status(404).json({ message: "O professor não foi encontrado." });
      }
    } catch (err) {
      // caso algum erro inesperado, a resposta ao professor será essa
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  //excluir professor
  router.delete("/professores/:id", async (req, res) => {
    // Precisamos checar se o pet existe antes de apagar
    const professor = await Professor.findByPk(req.params.id);
  
    try {
      if (professor) {
        // pet existe, podemos apagar
        await professor.destroy();
        res.json({ message: "O professor foi removido." });
      } else {
        res.status(404).json({ message: "O professor não foi encontrado" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  


module.exports = router;