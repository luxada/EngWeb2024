var mongoose = require("mongoose")
const { modelName } = require("../models/rua")
var Rua = require("../models/rua")

module.exports.list = async () => {
  const ruas = await Rua.find().exec(); // Use lean() to get plain JavaScript objects
  return ruas.map(rua => ({
    _id: rua._id,
    numero: rua.numero,
    nome: rua.nome,
    pos: rua.pos,
    figuras: rua.figuras,
    paragrafo: rua.paragrafo,
    casas: rua.casas,
    comentarios: rua.comentarios
  }));
}

module.exports.findById = id => {
  return Rua
  .findOne({ _id : id })
  .exec()
  .then(rua => ({
      _id: rua._id,
      numero: rua.numero,
      nome: rua.nome,
      pos: rua.pos,
      figuras: rua.figuras,
      paragrafo: rua.paragrafo,
      casas: rua.casas,
      comentarios: rua.comentarios
    }));
}

module.exports.findRuaByNome = (nome) => {
  return Rua
  .findOne({nome: nome})
  .exec()
  .then(rua => ({
    _id: rua._id,
    numero: rua.numero,
    nome: rua.nome,
    pos: rua.pos,
    figuras: rua.figuras,
    paragrafo: rua.paragrafo,
    casas: rua.casas,
    comentarios: rua.comentarios
  }));
};

module.exports.listaRuasByData = async (data) => {
  const regexSearch = new RegExp(data, 'gi');
  
  // Primeiro, obtenha os IDs únicos das ruas
  const ruaIds = await Rua.distinct('_id', {
    $or: [
      { "casas.desc.refs.datas": regexSearch },
      { "paragrafo.refs.datas": regexSearch }
    ]
  });

  // Em seguida, obtenha os documentos completos para esses IDs
  return Rua.find({ _id: { $in: ruaIds } })
    .sort({ numero: 1 })
    .exec()
    .then(ruas => ruas.map(rua => ({
      _id: rua._id,
      numero: rua.numero,
      nome: rua.nome,
      pos: rua.pos,
      figuras: rua.figuras,
      paragrafo: rua.paragrafo,
      casas: rua.casas,
      comentarios: rua.comentarios
    })));
};

module.exports.listaRuasByLugar = async (lugar) => {
  const regexSearch = new RegExp(lugar, 'gi');
  return Rua.find({
      $or: [
          { "casas.desc.refs.lugares.nome": regexSearch },
          { "paragrafo.refs.lugares.nome": regexSearch }
      ]
  })
  .setOptions({ sanitizeFilter: true })
  .sort({ numero: 1 })
  .exec()
  .then(ruas => ruas.map(rua => ({
      _id: rua._id,
      numero: rua.numero,
      nome: rua.nome,
      pos: rua.pos,
      figuras: rua.figuras,
      paragrafo: rua.paragrafo,
      casas: rua.casas,
      comentarios: rua.comentarios
  })));
};

module.exports.insert = r => {
  if((Rua.find({_id : r._id}).exec()).length != 1){
      var newRua = new Rua(r)
      return newRua.save()
  }
}

module.exports.deleteRua = async id => {
  return Rua.deleteOne({_id : id})
    .then(resposta => {
      return resposta
    })
    .catch(erro => {
      return erro
    })
}

module.exports.update = (id, rua) => {
    return Rua
      .findByIdAndUpdate(id, rua, {new : true})
      .exec()
}

module.exports.adicionarComentario = (ruaID, comentario) => {
  return Rua
  .updateOne({_id : ruaID}, {$push: {comentarios: comentario}})
  .then(resposta => {
      return resposta;
  })
  .catch(erro => {
      return erro;
  });
};

module.exports.removerComentario = (idRua, commentID) => {
  return Rua
    .findOneAndUpdate(
      { _id: idRua },
      { $pull: { comentarios: { _id: commentID } } },
      { new: true }
    )
    .then(resposta => {
      return resposta;
    })
    .catch(erro => {
      return erro;
    });
};