// carregando os modulos da minha aplicacao
const express    = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const admin      = require('./routes/admin'); //Aqui eu estou importanto
const mongoose   = require('mongoose');
const path       = require('path');
const session    = require('express-session')
const flash      = require('connect-flash')

const app = express();

//configuracoes
   // Sessão
    app.use(session({
      secret:"curiosidade",
      resave: true,
      saveUninitialized:true
    }))
    app.use(flash())
  //configurar o Middleware
    app.use((req, res, next)=>{
      res.locals.success_msg = req.flash("success_msg")
      res.locals.error_msg   = req.flash("error_msgg")
      next() // nao esquecer desta parte senao o servidor para
    })  
  //configurar o body-parser
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
  //configurar o handlebars
    app.engine('handlebars', handlebars({default: 'main'}));
    app.set('view engine', 'handlebars');
  //Mongoose
  mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/blogapp").then(()=>{
      console.log("Conectado ao banco");
    }).catch((err)=>{
      console.log("Erro ao se conectar: "+ err)
    })
  // public
    app.use(express.static(path.join(__dirname,"public")))  

//rotas
app.use('/admin', admin);


//para conectar ao servidor
const porta = 8081
app.listen(porta,()=>{
  console.log("Servidor funcionando!");
});
