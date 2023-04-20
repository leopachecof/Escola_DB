const Turma = require("../database/turma");
// const Professor = require("../database/professor");

const { Router } = require("express");

// Criar o grupo de rotas (/Clientes/turma)
const router = Router();

// Lista de todas as turmas
router.get("/turmas", async (req, res) => {
    // SELECT * FROM turmas;
    const listaTurmas = await Turma.findAll();
    res.json(listaTurmas);
});

// Listar uma determinada turma
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

//Adicionar turma
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

// atualizar um turma
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
        }
        else {
            res.status(404).json({ message: "turma não encontrada." });
        }
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

  // excluir um turma
  router.delete("/turmas/:id", async (req, res) => {
    // obter identificação da turmas pela rota
    const { id } = req.params;
    // buscar turma por id
    const turma = await Turma.findOne({ where: { id } });
    try {
      if(turma) {
        await turma.destroy();
        res.status(200).json({ message: "Turma removida." });
      }
      else {
        res.status(404).json({ message: "Turma não encontrada." });
      }
    }
    catch(err) {
      console.error(err);
      res.status(500).json({ message: "Um erro aconteceu." });
    }
  });

module.exports = router;