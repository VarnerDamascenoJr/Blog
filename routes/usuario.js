const express = require('express')
const router  = express.Router()
const mongoose= require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcryptjs')
const passport = require('passport')

router.get("/registro", (req, res)=>{
  res.render("usuarios/registro")
})

router.post("/registro",(req, res)=>{
  var erros = []

  if(!req.boby.nome || typeof req.body.nome == undefined || req.boby.nome == null){
    erros.push({texto:"Nome inválido"})
  }
  if(!req.boby.email || typeof req.body.email == undefined || req.boby.email == null){
    erros.push({texto:"E-mail inválido"})
  }
  if(!req.boby.senha || typeof req.body.senha == undefined || req.boby.senha == null){
    erros.push({texto:"Senha inválido"})
  }

  if(!req.boby.senha.length < 4){
    erros.push({texto:"Senha muito curta"})
  }
  if(!req.boby.senha != req.body.senha2){
    erros.push({texto:"Senhas diferentes, tente novamente."})
  }
  if(erros.length > 0){
    res.render("usuarios/registro",{erros:erros})

  }else {
    //verificar se o usuário que está tentando se cadastrar, se o email dele já existe
    //pesquisar por emal
    Usuario.findOne({email: req.body.email}).then((usuario)=>{
      if (usuario) {
        req.flash("error_msg","Já existe uma conta com este email no sistema.")
        res.redirect("usuarios/registro")
      }else {
        cont novousuario = new Usuario({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        //uso isso aqui para criar um usuário administrador  eAdmin = 1
        })

        //nao posso salvar o objeto antes de encriptar a senha.
        //Assim, irei encriptar para dar maior segurança no trato com a senha
        bcrypt.genSalt(10, (erro, salt)=>{
          bcrypt.hash(novousuario.senha, salt, (erro, hash)=>{
            if(erro){req.flash("error_msg","Houve um erro ao salvar") res.redirect("/")}
            //Aqui pegará a nova senha
            novousuario.senha = hash
            novousuario.save().then(()=>{
              req.flash("success_msg", "Salvo com sucesso") res.redirect("/")
            }).catch((err)=>{
              req.flash("error_msg"," Houve um erro ao criar") res.redirect("/usuarios/registro")
            })

          })//funcao com três parâmetros

        })
      }
    }).catch((err)=>{ req.flash("error_msg","Houve um erro interno") res.redirect("/")})
  }//fim else
})

router.get("/login", (req, res)=>{
  res.render("usuarios/login")
})
//rota de autenciticação
router.post("/login", (req, res, next)=>{
   passport.authenticate("local", {
     successRedirect:"/",
     failureRedirect:"/usuarios/login",
     failureRedirect:true
   })(req, res, next)
})
model.exports = router
