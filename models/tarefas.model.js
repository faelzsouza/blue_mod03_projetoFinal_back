const mongoose = require("mongoose");

const tarefasSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    prioridade: { type: String, required: true },
    status: { type: String, required: true },
    prazo: { type: Date, required: true },
    dataCriacao: { type: Date, default: Date.now() },
});

const Tarefas = mongoose.model("tarefas", tarefasSchema);

module.exports = Tarefas;
