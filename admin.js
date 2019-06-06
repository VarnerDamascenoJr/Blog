const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
require("../models/Categoria")
const Categoria = mongoose.model("categoria")



router.get('/',(req, res)=>{
  res.render("admin/index");
});

router.get('/posts',(req, res)=>{
  res.render("pagina de post")
});
router.get('/categorias',(req, res)=>{
  res.get("Ola caralhinhi")
})
router.get('/categorias/add', (req, res)=>{
  res.render('addcategoria')
}
router.post('/categoria/nova', (req, res)=>{
  
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
      erros.push({nome:"nome invalido"})
    }
    if(!req.body.slug || req.body.slug == undefined || req.body.slug == null){
      erros.push({texto:"Slug invalido"})
    }
    if(req.body.nome.length < 2){
      erros.push({texto:"Nome da categoria muito pequeno"})
    }
    if(erros.length >0){
      res.render("admin/addcategorias", {erros:erros})
    }else{
      const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
      }
  
      new Categoria(novaCategoria).save().then(()=>{
        req.flash("success_msg","categoria adicionada com sucesso")
        res.redirect("/admin/categorias")
      }).catch((err)=>{
        req.flash("error_msg", "tente novamente")
        console.log("Erro ao salvar: "+err);
      })
    }
})

module.exports = router;
