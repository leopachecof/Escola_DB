const Turma = require("../database/turma");
const Aluno = require("../database/aluno");

const { Router } = require("express");

// Criar o grupo de rotas (/alunos/alunos)
const router = Router();

//Lista de alunos
router.get("/alunos", async (req, res) => {
  const listaAlunos = await Aluno.findAll();
  res.json(listaAlunos);
});

// Listar um determinado aluno
/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - Nome
 *         - email_responsavel
 *         - telefone_responsavel
 *       properties:
 *         id:
 *           type: string
 *           description: Id gerado automaticamente pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: o nome do aluno
 *         email_responsavel:
 *           type: string
 *           description: o email do responsavel
 *         telefone_responsavel:
 *           type: string
 *           description: o telefone do responsavel
 *         createdAt:
 *           type: string
 *           format: date
 *           description: A data do cadastro
 *       example:
 *         - Nome: José 
 *         - email_responsavel: joao@gmail.com
 *         - telefone_responsavel: (21) 9 6666-5555
 */
router.get("/alunos/:id", async (req, res) => {
  const { id } = req.params;

  const aluno = await Aluno.findByPk(id);
  if(aluno) {
    res.json(aluno);
  }
  else {
    res.status(404).json({ message: "Aluno não encontrado." });
  }
});

//adicionar de alunos
router.post("/alunos", async (req, res) => {
    const { nome, email_responsavel, telefone_responsavel, turmaId } = req.body;
  
    try {
      const turma = await Turma.findByPk(turmaId);
      if(turma) {
        const aluno = await Aluno.create({nome, email_responsavel, telefone_responsavel, turmaId});
        res.status(201).json(aluno);
      }
      else {
        res.status(404).json({ message: "Turma não encontrada." });
      }
    }
    catch(err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  //atualizar aluno
  router.put("/alunos/:id", async (req, res) => {
    // Esses são os dados que virão no corpo JSON
    const { nome, email_responsavel, telefone_responsavel, turmaId } = req.body;
  
    // É necessário checar a existência do Pet
    // SELECT * FROM alunos WHERE id = "req.params.id";
    const aluno = await Aluno.findByPk(req.params.id);
  
    // se aluno é null => não existe o pet com o id
    try {
      if (aluno) {
        // IMPORTANTE: Indicar qual o aluno a ser atualizado
        // 1º Arg: Dados novos, 2º Arg: Where
        await Aluno.update(
          { nome, email_responsavel, telefone_responsavel, turmaId },
          { where: { id: req.params.id } } // WHERE id = "req.params.id"
        );
        // await pet.update({ nome, tipo, dataNasc, porte });
        res.json({ message: "O aluno foi editado." });
      } else {
        // caso o id seja inválido, a resposta ao aluno será essa
        res.status(404).json({ message: "O aluno não foi encontrado." });
      }
    } catch (err) {
      // caso algum erro inesperado, a resposta ao aluno será essa
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

  //excluir aluno
  router.delete("/alunos/:id", async (req, res) => {
    // Precisamos checar se o pet existe antes de apagar
    const aluno = await Aluno.findByPk(req.params.id);
  
    try {
      if (aluno) {
        // pet existe, podemos apagar
        await aluno.destroy();
        res.json({ message: "O aluno foi removido." });
      } else {
        res.status(404).json({ message: "O aluno não foi encontrado" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });
  


module.exports = router;