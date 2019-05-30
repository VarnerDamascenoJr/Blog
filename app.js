// carregando os modulos da minha aplicacao
const express    = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const admin      = require('./routes/admin'); //Aqui eu estou importanto
//const mongoose   = require('mongoose');
const path       = require('path');

const app = express();

//configuracoes
  //configurar o body-parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
  //configurar o handlebars
    app.engine('handlebars', handlebars({default: 'main'}));
    app.set('view engine', 'handlebars');
  // public
    app.use(express.static(path.join(__dirname,"public")))  

//rotas
app.use('/admin', admin);


//para conectar ao servidor
const porta = 8081
app.listen(porta,()=>{
  console.log("Servidor funcionando!");
});
