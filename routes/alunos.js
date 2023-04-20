const Turma = require("../database/turma");
const Aluno = require("../database/aluno");

const { Router } = require("express");

// Criar o grupo de rotas (/alunos/alunos)
const router = Router();

// GET - Listar todos os alunos
/**
 * @swagger
 *   description: Rota para listar todos os alunos.
 * /alunos:
 *   get:
 *     summary: Listar alunos
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array 
 *             items:
 *               type: object      
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Id gerado automaticamente pelo Banco de Dados
 *                 nome:
 *                   type: string
 *                   description: o nome do aluno
 *                 email_responsavel:
 *                   type: string
 *                   description: o email do responsavel
 *                 telefone_responsavel:
 *                   type: string
 *                   description: o telefone do responsavel
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: A data do cadastro
 *               example:
 *                 - id: 1
 *                   nome: João da Silva
 *                   email_responsavel: joao.silva@gmail.com
 *                   telefone_responsavel: (11) 91234-5678
 *                   createdAt: 2021-09-01T15:34:12.000Z
 *                 - id: 2
 *                   nome: Maria Souza
 *                   email_responsavel: maria.souza@hotmail.com
 *                   telefone_responsavel: (21) 98765-4321
 *                   createdAt: 2021-09-05T09:45:27.000Z
 *     responses:
 *       200:
 *         description: Alunos listados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alunos'
 *       500:
 *         description: Um problema foi encontrado.
 *
 */
router.get("/alunos", async (req, res) => {
  const listaAlunos = await Aluno.findAll();
  res.json(listaAlunos);
});

// SCHEMAS - Listar um determinado aluno
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

// GET - Listar um determinado aluno
/**
 * @swagger
 *   description: Rota para listar um determinado aluno.
 * /alunos/{id}:
 *   get:
 *     summary: Listar aluno
 *     tags: [Alunos]
 *     parameters:
 *         name: id
 *         in: path
 *         description: ID do aluno a ser listado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID gerado pelo Banco de Dados para o aluno
 *               nome:
 *                 type: string
 *                 description: Nome do aluno
 *               email_responsavel:
 *                 type: string
 *                 description: Email do responsável pelo aluno
 *               telefone_responsavel:
 *                 type: string
 *                 description: Telefone do responsável pelo aluno
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Data do cadastro
 *               turmaId:
 *                 type: Number
 *                 description: ID gerado pelo Banco de Dados para turma
 *             example:
 *               id: 1
 *               nome: João da Silva
 *               email_responsavel: joao.silva@gmail.com
 *               telefone_responsavel: (11) 91234-5678
 *               createdAt: 2021-09-01T15:34:12.000Z
 *               turmaId: 2
 *     responses:
 *       200:
 *         description: Aluno listado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Um problema foi encontrado.
 * 

 */
router.get("/alunos/:id", async (req, res) => {
  const { id } = req.params;

  const aluno = await Aluno.findByPk(id);
  if (aluno) {
    res.json(aluno);
  }
  else {
    res.status(404).json({ message: "Aluno não encontrado." });
  }
});
// POST - adicionar de alunos
/**
 * @swagger
 *   description: API para gerenciamento de alunos
 * /alunos:
 *   post:
 *     summary: Criar novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Erro interno do servidor.
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id gerado automaticamente pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: o nome do aluno
 *         email_responsavel:
 *           type: string
 *           description: o email do responsável
 *         telefone_responsavel:
 *           type: string
 *           description: o telefone do responsável
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data do cadastro
 *       example:
 *         id: 1
 *         nome: João da Silva
 *         email_responsavel: joao.silva@gmail.com
 *         telefone_responsavel: (11) 91234-5678
 *         createdAt: 2021-09-01T15:34:12.000Z
 */
router.post("/alunos", async (req, res) => {
  const { nome, email_responsavel, telefone_responsavel, turmaId } = req.body;

  try {
    const turma = await Turma.findByPk(turmaId);
    if (turma) {
      const aluno = await Aluno.create({ nome, email_responsavel, telefone_responsavel, turmaId });
      res.status(201).json({ message: "Aluno cadastrado com sucesso!" });
    }
    else {
      res.status(404).json({ message: "Turma não encontrada." });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//PUT - atualizar aluno
/**
 * @swagger
 * /alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno pelo ID.
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID do aluno a ser atualizado.
 *       - in: body
 *         name: body
 *         required: true
 *         description: Dados do aluno a serem atualizados.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               description: Nome do aluno.
 *             email_responsavel:
 *               type: string
 *               description: E-mail do responsável pelo aluno.
 *             telefone_responsavel:
 *               type: string
 *               description: Telefone do responsável pelo aluno.
 *             turmaId:
 *               type: integer
 *               description: ID da turma do aluno.
 *     responses:
 *       '200':
 *         description: Aluno atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *       '404':
 *         description: Aluno não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 *       '500':
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro.
 */
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

// DELETE - deletar determinado aluno
/**
 * @swagger
 *   description: Rota para deletar um determinado aluno.
 * /alunos/{id}:
 *   delete:
 *     summary: deletar aluno
 *     tags: [Alunos]
 *     parameters:
 *         name: id
 *         in: path
 *         description: ID do aluno a ser deletado
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID gerado pelo Banco de Dados para o aluno
 *               nome:
 *                 type: string
 *                 description: Nome do aluno
 *               email_responsavel:
 *                 type: string
 *                 description: Email do responsável pelo aluno
 *               telefone_responsavel:
 *                 type: string
 *                 description: Telefone do responsável pelo aluno
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Data do cadastro
 *               turmaId:
 *                 type: Number
 *                 description: ID gerado pelo Banco de Dados para turma
 *             example:
 *               id: 1
 *               nome: João da Silva
 *               email_responsavel: joao.silva@gmail.com
 *               telefone_responsavel: (11) 91234-5678
 *               createdAt: 2021-09-01T15:34:12.000Z
 *               turmaId: 2
 *     responses:
 *       200:
 *         description: Aluno deletado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       500:
 *         description: Um problema foi encontrado.
 */ 
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