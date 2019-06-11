const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const Postagem = new Schhema({
      tituto:{type: String, required: true},
      slug:{type: String, required: true},
      descricao:{type:String, required: true},
      conteudo:{type: String, required:true},
      categoria:{type: Schema.ObjetcId, ref: "categorias", required: true}
      data:{type:Date,default:Date.now()}
})

mongoose.model("postagens", Postagem)
