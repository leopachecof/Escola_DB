const Turma = require("../database/turma");
// const Professor = require("../database/professor");

const { Router } = require("express");

// Criar o grupo de rotas (/Clientes/turma)
const router = Router();

// GET - Listar todas as turmas
/**
 * @swagger
 *   description: Rota para listar todas as turmas.
 * /turmas:
 *   get:
 *     summary: Listar turmas
 *     tags: [Turmas]
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
 *                   description: nome da turma
 *                 tipo:
 *                   type: string
 *                   description: tipo da turma
 *                 ano:
 *                   type: string
 *                   description: ano da turma
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: A data do cadastro
 *               example:
 *                 - id: 1
 *                   nome: Turma A
 *                   tipo: fundamental
 *                   ano: 2
 *                   createdAt: 2021-09-01T15:34:12.000Z
 *                 - id: 2
 *                   nome: Turma B
 *                   tipo: fundamental
 *                   ano: 3
 *                   createdAt: 2021-09-05T09:45:27.000Z
 *     responses:
 *       200:
 *         description: Alunos listados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turmas'
 *       500:
 *         description: Um problema foi encontrado.
 *
 */
router.get("/turmas", async (req, res) => {
    // SELECT * FROM turmas;
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

// SCHEMAS - Listar uma determinada turma
/**
 * @swagger
 * components:
 *   schemas:
 *     Turma:
 *       type: object
 *       required:
 *         - Nome
 *         - tipo
 *         - ano
 *       properties:
 *         id:
 *           type: string
 *           description: Id gerado automaticamente pelo Banco de Dados
 *         nome:
 *           type: string
 *           description: o nome da turma
 *         tipo:
 *           type: string
 *           description: o tipo de turma
 *         ano:
 *           type: string
 *           description: o ano correspondente
 *         createdAt:
 *           type: string
 *           format: date
 *           description: A data do cadastro
 *       example:
 *         - Nome: Turma A
 *         - tipo: ensino médio
 *         - ano: série 1
 */

// GET - Listar uma determinada turma
/**
 * @swagger
 *   description: Rota para listar uma determinada turma.
 * /turmas/{id}:
 *   get:
 *     summary: Listar turma
 *     tags: [Turmas]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da turma a ser listada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turma listada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID gerado pelo Banco de Dados
 *                 nome:
 *                   type: string
 *                   description: Nome da turma
 *                 tipo:
 *                   type: string
 *                   description: nível escolar
 *                 ano:
 *                   type: integer
 *                   description: ano de referência
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data do cadastro
 *             example:
 *               nome: Turma A
 *               tipo: Fundamental 1
 *               ano: 1
 *       500:
 *         description: Um problema foi encontrado.
 *
 */
router.get("/turmas/:id", async (req, res) => {
    const { id } = req.params;
    const turma = await Turma.findByPk(id);

    // const turma = await Turma.findOne({
    //     where: { id: req.params.id }
    //     // include: [Professor],
    // });

    if (turma) {
        res.json(turma);
    } else {
        res.status(404).json({ message: "Turma não encontrada." });
    }
});

// POST - adicionar turma
/**
 * @swagger
 *   description: API para gerenciamento de turmas
 * /turmas:
 *   post:
 *     summary: Criar nova turma
 *     tags: [Turmas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Turma'
 *     responses:
 *       200:
 *         description: Turma criada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turma'
 *       500:
 *         description: Erro interno do servidor.
 *   components:
 *     schemas:
 *       Turma:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             description: Id gerado automaticamente pelo Banco de Dados
 *           nome:
 *             type: string
 *             description: o nome da turma
 *           tipo:
 *             type: string
 *             description: o tipo da turma
 *           ano:
 *             type: string
 *             description: o ano da turma
 *           createdAt:
 *             type: string
 *             format: date-time
 *             description: A data do cadastro
 *         example:
 *           id: 1
 *           nome: A
 *           tipo: fundamental 1
 *           ano: 5
 *           createdAt: 2021-09-01T15:34:12.000Z
 */
router.post("/turmas", async (req, res) => {
    // Coletar os dados do req.body
    const { nome, tipo, ano } = req.body;

    try {
        // Dentro de 'novo' estará o o objeto criado
        const novo = await Turma.create(
            { nome, tipo, ano }
            // { include: [Professor] }
        );

        res.status(201).json(novo);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

//PUT - Atualiza Turmas
/**
 * @swagger
 * /turmas/{id}:
 *   put:
 *     summary: Atualiza as informações de uma turma pelo ID.
 *     tags: [Turmas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da turma a ser atualizada.
 *         schema:
 *           type: integer
 *       - name: Turma
 *         in: body
 *         required: true
 *         description: Novas informações da turma.
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             tipo:
 *               type: string
 *             ano:
 *               type: string
 *     responses:
 *       200:
 *         description: Turma atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Turma não encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 */
router.put("/turmas/:id", async (req, res) => {
    // obter dados do corpo da requisão
    const { nome, tipo, ano } = req.body;
    // obter identificação do cliente pelos parametros da rota
    const { id } = req.params;
    try {
        // buscar cliente pelo id passado
        const turma = await Turma.findOne({ where: { id } });
        // validar a existência desse turma no banco de dados
        if (turma) {
            // validar a existência desse do endereço passdo no corpo da requisição
            // if (professor) {
            //     await Professor.update(professor, { where: { turmaId: id } });
            // }
            // atualizar o turma com nome, email e telefone
            await turma.update({ nome, tipo, ano });
            res.status(200).json({ message: "turma editada." });
        } else {
            res.status(404).json({ message: "turma não encontrada." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

// DELETE - Excluir uma determinada turma
/**
 * @swagger
 *   description: Rota para deletar uma determinada turma.
 * /turmas/{id}:
 *   delete:
 *     summary: Deletar turma
 *     tags: [Turmas]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID da turma a ser deletada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turma deletada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID gerado pelo Banco de Dados
 *                 nome:
 *                   type: string
 *                   description: Nome da turma
 *                 tipo:
 *                   type: string
 *                   description: nível escolar
 *                 ano:
 *                   type: integer
 *                   description: ano de referência
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data do cadastro
 *             example:
 *               nome: Turma A
 *               tipo: Fundamental 1
 *               ano: 1
 *       500:
 *         description: Um problema foi encontrado.
 *
 */
router.delete("/turmas/:id", async (req, res) => {
    // obter identificação da turmas pela rota
    const { id } = req.params;
    // buscar turma por id
    const turma = await Turma.findOne({ where: { id } });
    try {
        if (turma) {
            await turma.destroy();
            res.status(200).json({ message: "Turma removida." });
        } else {
            res.status(404).json({ message: "Turma não encontrada." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

module.exports = router;
