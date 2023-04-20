const Turma = require("../database/turma");
const Professor = require("../database/professor");

const { Router } = require("express");

// Criar o grupo de rotas (/professor)
const router = Router();

// GET - Listar todos os professores
/**
 * @swagger
 *   description: Rota para listar todos os professores.
 * /professores:
 *   get:
 *     summary: Listar professores
 *     tags: [Professores]
 *     responses:
 *       200:
 *         description: Professores listados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array 
 *               items:
 *                 type: object      
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Id gerado automaticamente pelo Banco de Dados
 *                   nome:
 *                     type: string
 *                     description: nome do professor
 *                   email:
 *                     type: string
 *                     description: email do professor
 *                   telefone_responsavel:
 *                     type: string
 *                     description: telefone do professor
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: A data do cadastro
 *                   turmaId:
 *                     type: string
 *                     description: id da turma deste professor
 *               example:
 *                 - id: 1
 *                   nome: João da Silva
 *                   email: joao.silva@gmail.com
 *                   telefone: (11) 91234-5678
 *                   createdAt: 2021-09-01T15:34:12.000Z
 *                   turmaId: 1 	
 *                 - id: 2
 *                   nome: Maria Souza
 *                   email: maria.souza@hotmail.com
 *                   telefone: (21) 98765-4321
 *                   createdAt: 2021-09-05T09:45:27.000Z
 *                   turmaId: 2
 *       500:
 *         description: Um problema foi encontrado.
 */
router.get("/professores", async (req, res) => {
  const listaProfessores = await Professor.findAll();
  res.json(listaProfessores);
});

// SCHEMAS - Listar um determinado Professor
/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required:
 *         - Nome
 *         - email
 *         - telefone
 *         - turmaId
 *       properties:
 *         id:
 *           type: number
 *           description: Id gerado automaticamente pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: o nome do professor
 *         email:
 *           type: string
 *           description: o email do professor
 *         telefone:
 *           type: string
 *           description: o telefone do professor
 *         createdAt:
 *           type: string
 *           format: date
 *           description: A data do cadastro
 *         turmaId:
 *           type: number
 *           description: Id gerado conforme turma atribuida
 *       example:
 *         - Nome: José 
 *         - email: jose@gmail.com
 *         - telefone: (21) 9 6666-5555
 *         - turmaId: 1 
 */

// GET - Listar um determinado professor
/**
 * @swagger
 *   description: Rota para listar um determinado professor.
 * /professores/{id}:
 *   get:
 *     summary: Listar professor
 *     tags: [Professores]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do professor a ser listado
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
 *                 description: ID gerado pelo Banco de Dados para o professor
 *               nome:
 *                 type: string
 *                 description: Nome do professor
 *               email:
 *                 type: string
 *                 description: Email do professor
 *               telefone:
 *                 type: string
 *                 description: Telefone do professor
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
 *               email: joao.silva@gmail.com
 *               telefone: (11) 91234-5678
 *               createdAt: 2021-09-01T15:34:12.000Z
 *               turmaId: 2
 *     responses:
 *       200:
 *         description: Professor listado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       500:
 *         description: Um problema foi encontrado.
 * 
 */
router.get("/professores/:id", async (req, res) => {
  const { id } = req.params;

  const professor = await Professor.findByPk(id);
  if (professor) {
    res.json(professor);
  }
  else {
    res.status(404).json({ message: "Professor não encontrado." });
  }
});

// POST - adicionar professor
/**
 * @swagger
 *   description: API para gerenciamento de professores
 * /professores:
 *   post:
 *     summary: Criar novo professor
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       200:
 *         description: Professor adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       500:
 *         description: Erro interno do servidor.
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Id gerado automaticamente pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: o nome do professor
 *         email:
 *           type: string
 *           description: o e-mail do professor
 *         telefone:
 *           type: string
 *           description: o telefone do professor
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: A data do cadastro
 *       example:
 *         id: 1
 *         nome: José Augusto
 *         email: JoseAugusto@gmail.com
 *         telefone: 11-1111-1111
 *         createdAt: 2021-09-01T15:34:12.000Z
 */
router.post("/professores", async (req, res) => {
  const { nome, email, telefone, turmaId } = req.body;

  try {
    const turma = await Turma.findByPk(turmaId);
    if (turma) {
      const professor = await Professor.create({ nome, email, telefone, turmaId });
      res.status(201).json(professor);
    }
    else {
      res.status(404).json({ message: "Professor(a) não encontrada." });
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Um erro aconteceu." });
  }
});

//PUT - Atualiza Professores 
/**
 * @swagger
 * /professores/{id}:
 *   put:
 *     summary: Atualiza informações de um professor
 *     tags: [Professores]
 *     description: Essa rota permite a atualização dos dados de um professor existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do professor a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: JSON contendo as informações atualizadas do professor
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do professor
 *               email:
 *                 type: string
 *                 description: E-mail do professor
 *               telefone:
 *                 type: string
 *                 description: Número de telefone do professor
 *               turmaId:
 *                 type: integer
 *                 description: ID da turma em que o professor leciona
 *     responses:
 *       200:
 *         description: Professor atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso
 *                   example: O professor foi editado.
 *       404:
 *         description: Professor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: O professor não foi encontrado.
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de erro
 *                   example: Um erro aconteceu.
 */
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

// DELETE - Deletar um determinado professor
/**
 * @swagger
 *   description: Rota para deletar um determinado professor.
 * /professores/{id}:
 *   delete:
 *     summary: deletar professor
 *     tags: [Professores]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do professor a ser deletado
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
 *                 description: ID gerado pelo Banco de Dados para o professor
 *               nome:
 *                 type: string
 *                 description: Nome do professor
 *               email:
 *                 type: string
 *                 description: Email do professor
 *               telefone:
 *                 type: string
 *                 description: Telefone do professor
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
 *               email: joao.silva@gmail.com
 *               telefone: (11) 91234-5678
 *               createdAt: 2021-09-01T15:34:12.000Z
 *               turmaId: 2
 *     responses:
 *       200:
 *         description: Professor deletado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professores'
 *       500:
 *         description: Um problema foi encontrado.
 * 
 */
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