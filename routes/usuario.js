const express = require('express')
const router  = express.Router()
const mongoose= require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")


router.get("/registro", (req, res)=>{
  res.render("usuarios/registro")
})

router.post("/registro",(req, res)=>{
  var erros = []

  if(!req.boby.nome || typeof req.body.nome == undefined || req.boby.nome == null){
    erros.push({texto:"Nome inválido"})
  }
  f(!req.boby.email || typeof req.body.email == undefined || req.boby.email == null){
    erros.push({texto:"E-mail inválido"})
  }
  f(!req.boby.senha || typeof req.body.senha == undefined || req.boby.senha == null){
    erros.push({texto:"Senha inválido"})
  }
})

model.exports = router
