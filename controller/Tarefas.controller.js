const mongoose = require('mongoose')

const checkId = (res, id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(422).send("Código inválido.");
    }
}

const checkKeys = (res, body) => {
    if(!body.titulo || !body.descricao || !body.prioridade || !body.status || !body.prazo){
        res.status(400).send('Digite as informações corretamente!')
    }
}

const checkDate = (body) => {
    if (new Date(body.prazo) < new Date(Date.now()).toLocaleDateString()) {
        return false
    }
    return true
}

module.exports = {
    checkId,
    checkKeys,
    checkDate
}