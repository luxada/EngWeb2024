var mongoose = require('mongoose')

var periodoSchema = new mongoose.Schema({
    _id: String,
    nome: String
}, {collection: 'Periodos', versionKey: false})

module.exports = mongoose.model('periodos', periodoSchema)