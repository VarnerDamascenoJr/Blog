const mongoose = require('mongoose')
const Schema   = mongoose.Schema //para que a código fique mais prático

const Categoria = new Schema({
  nome: {
    type: String,
    required: true
  },
  slug:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    defaut: Date.now() //Aqui será pego a hora padrão que o usuário cadastrar
  }
})

mongoose.model("categorias", Categoria) //Aqui está a criação do model
