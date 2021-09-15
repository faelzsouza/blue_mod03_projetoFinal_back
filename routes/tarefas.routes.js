const router = require("express").Router();
const {
    checkKeys,
    checkDate,
    checkId,
} = require("../controller/Tarefas.controller");
const Tarefas = require("../models/tarefas.model");

router.get("/", async (req, res) => {
    await Tarefas.find({})
        .then((tarefas) => res.status(200).send(tarefas))
        .catch((err) => {
            console.error(err);
            res.status(404).send(err);
        });
});

router.get("/findById/:id", async (req, res) => {
    checkId(res, req.params.id);
    await Tarefas.find({ _id: req.params.id })
        .then((tarefa) => res.status(200).send(tarefa))
        .catch((err) => {
            console.error(err);
            res.status(404).send(err);
        });
});

router.post("/add", async (req, res) => {
    checkKeys(res, req.body);
    if (!checkDate(req.body)) {
        res.status(400).send("O prazo não pode ser menor ou igual a hoje!");
    } else {
        await Tarefas.create(req.body)
            .then(() => res.status(201).send("Tarefa adicionada com sucesso!"))
            .catch((err) => {
                console.error(err);
                res.status(400).send(err);
            });
    }
});

router.put("/update/:id", async (req, res) => {
    checkId(res, req.params.id);
    checkKeys(res, req.body);
    if (!checkDate(req.body)) {
        res.status(400).send("O prazo não pode ser menor ou igual a hoje!");
    } else {
        await Tarefas.findByIdAndUpdate(req.params.id, req.body)
            .then(() =>
                res
                    .status(201)
                    .send(`Tarefa ${req.params.id} atualizada com sucesso!`)
            )
            .catch((err) => {
                console.error(err);
                res.status(400).send(err);
            });
    }
});

router.delete("/delete/:id", async (req, res) => {
    checkId(res, req.params.id);
    await Tarefas.findByIdAndDelete(req.params.id)
        .then(() =>
            res
                .status(200)
                .send(`Tarefa ${req.params.id} deletada com sucesso!`)
        )
        .catch((err) => {
            console.error(err);
            res.status(400).send(err);
        });
});

module.exports = router;
