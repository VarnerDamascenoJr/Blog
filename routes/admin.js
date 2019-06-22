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
  //aqui para listar os post por data
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

//rota para configuração ddos meus nomes das categorias a parir do id
//E indo no arquivo categorias.handlebars, há lá o link para esta função else {
// e que será pego o id dinamicamente.

router.get('/categorias/edit/:id',(req, res)=>{
//neste caso, o edit funcionará pois pegará o id específico que eu quero usar
Categoria.findOne({_id:req.params.id}).then((categoria)=>{
  res.render("admin/editcategorias",{categoria:categoria})
}).catch((err)=>{
  req.flash("error_msg","Esta categoria não existe")
  req.redirect("/admin/categorias")
})
})
router.post('/categorias/edit', (req, res)=>{
  //ainda falta o sistema de validação
  Categoria.findOne({_id: req.body.id}).then((categoria)=>{
    categoria.nome  = req.body.nome //pegará o nome que virá do formulário de edirção
    categoria.slug  = req.body.slug

    categoria.save().then(()=>{
      req.flash("success_msg", "categoria editada com sucesso")
      res.redirect("/admin/categorias")
    }).catch((err)=>{
      req.flash("error_msg" ,"Houve erro interno")
      res.redirect("/admin/categorias")
    })

  }).catch((err)=>{
    req.flash("error_msg","Houve um erro ao editar a categoria")
    req.redirect("/admin/categorias")
  })
})

router.post("/categorias/deletar", (req, res)=>{
  //que pegará do formulário de categorias e removerá
  //o post selecionado a partir do botão, pois será pego o id
  //da postagem
  Categoria.remove({_id: req.body.id}).then(()=>{
    req.flash("success_msg", "Categoria deletada com sucesso")
    res.redirect("/admin/categorias")
  }).catch((err)=>{
    req.flash("error_msg","Falha ao deletar a postagem")
    res.redirect("/admin/categorias")
  })
})

router.get("/postagens",(req, res)=>{
    res.render("admin/postagens")
})
router.get("/postagens/add", (req, res)=>{
  Categoria.find().then((categorias)=>{
    res.render("admin/addpostagens",{categorias:categorias}) //passa todas as categorias dentro da view de postagem
  }).catch((err)=>{
    req.flash("error_msg","Houve um erro ao carregar o formulário")
    res.redirect("/admin")
  })
})
module.exports = router //esta parte para exportar o router
