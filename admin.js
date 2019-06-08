const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model("categorias")
//Aqui embaixo eu declaro todas as rotas das quais necessito.

router.get('/',(req, res)=>{
  res.render('admin/index')
})
router.get('/posts',(req, res)=>{
  res.send('Pagina de posts')
})

router.get('/categorias',(req, res)=>{
  Categoria.find().sort({date:'desc'}).then((categorias)=>{
    res.render('admin/categorias', {categorias:categorias})
  }).catch((err)=>{
    req.flash("error_msg", "Houve um erro ao listar as categorias")
    res.redirect("/admin")
  })
})

router.get('/categorias/add',(req, res)=>{
  res.render('admin/addcategoria')
})
router.post('/categorias/nova', (req, res)=>{
  //Aqui será feita a validação manual
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto:"Nome inválido"})
  }
  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto:"Slug inválido "})
  }
  if(req.body.nome.length < 2){
    erros.push({texto:"Nome muito pequeno"})
  }
  if(erros.length >0){
    res.render("admin/addcategoria",{erros: erros})
  }

  const novaCategoria = {  // fará referência as npme e slug já criados
    nome: req.body.nome,
    slug: req.body.slug
  }
  new Categoria(novaCategoria).save().then(()=>{
    req.flash("Categoria criada com sucesso!")
    res.redirect("/admin/categorias")
  }).catch((err)=>{
    req.flash("error_msg", "Houve um erro ao salvar")  //mensagem que será enviada a partir de uma partial
    console.log("Não foi possível adicionar: "+err)
  })

})


module.exports = router //esta parte para exportar o router
