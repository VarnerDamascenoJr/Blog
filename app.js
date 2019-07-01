//Carregando módulos
const express    = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path       = require('path')
const session    = require('express-session')
const flash      = require('connect-flash')

const app = express()
const admin = require('./routes/admin')
const mongoose = require('mongoose')
require("./model/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('/config/auth')(passport)
//Configurações
   //Sessão
     app.use(session({
       secret:"Meu blog",
       resave: true,
       saveUninitialized: true
     }))
     //deve ficar nesta ordem
     app.use(passport.initialize())
     app.use(passport.session())

     app.use(flash())
   //Middleware
     app.use((req, res, next)=>{
       //Agora criarei variáveis globais e que eu posso acessá-las em qualquer parte da minha aplicação
       res.locals.success_msg = req.flash("success_msg")  // Na primeira eu farei que seja exibida uma mensagem de cadastro bem sucedido
       res.locals.error_msg   = req.flash("error_msg")   //Aqui farei uma mensagem de erro
      next()
     })
  //Body parser
     app.use(bodyParser.urlencoded({extended : true}))
     app.use(bodyParser.json())
  //Handlebars
     app.engine('handlebars', handlebars({defaultLayout: 'main'}))
     app.set('view engine', 'handlebars')
  //Mongoose
     mongoose.Promisse = global.Promisse;
     mongoose.connect("mongodb://localhost/blogapp").then(()=>{
       console.log("Conectado ao banco")
     }).catch((err)=>{
       console.log("Nao conectado: "+err)
     })
  //Public
     // E aqui estamos informando que a pasta que contém todos os nossos arquivos estáticos é pasta public
     app.use(express.static(path.join(__dirname,"public"))) // Aqui há a comunicação para que o express tenha conhecimento da nossa página estática
//Rotas
     app.get("/", (req, res)=>{
       Postagem.find().populate("categoria").sort({data:'desc'}).then((postagens)=>{
         res.render("index",{postagens:postagens})
       }).catch((err)=>{
         req.flash("error_msg","Houve um erro interno")
         res.redirect("/404")
       })
     })

     app.get('/postagem/:slug', (req, res)=>{
       Postagem.findOne({slug:req.params.slug}).then((postagem)=>{
         if (postagem) {
           res.render("postagem/index", {postagem:postagem})
         }else {
           req.flash("error_msg","Esta postagem não existe")
           res.redirect("/")
         }
       }).catch((err)=>{
         req.flash("error_msg","Houve um erro")
         res.redirect("/")
       })
     })
     app.get("/404",(req, res)=>{
       res.send('Erro 404')
     })
     app.get("/categorias",(req, res)=>{
       Categoria.find().then((categoria)=>{
         res.render("categorias/index",{categorias:categorias})
       }).catch((err)=>{
         req.flash("error_msg","Houve um erro interno ao listar")
         res.redirect("/")
       })
     })
     app.get("/categorias/:slug", (req, res)=>{
       Categoria.findOne({slug:req.params.slug}).then((categoria)=>{
         if (categoria) {
           Postagem.find({categoria:categoria._id}).then((postagens)=>{
             res.render("categorias/postagens",{postagens:postagens, categoria:categoria})
           }).catch((err)=>{
             req.flash("error_msg", "Não foi possível achar a categoria")
             res.redirect("/")
           })
         }else {
           req.flash("error_msg", "Esta categoria não existe")
           res.redirect("/")
         }

       }).catch((err)=>{
         req.flash("error_msg", "Houve um erro interno")
         res.redirect("/")
       })
     })
     app.use('/admin', admin) //para importar a rota no admin e fazê-la rodas no servidor
     app.use('/usuarios', usuarios)
//Outros
const PORT = 8081
app.listen(PORT,()=>{
  console.log("Servidor funcionando!")
})
