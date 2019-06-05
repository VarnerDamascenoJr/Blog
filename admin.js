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
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(()=>{
      console.log("Salvo com sucesso!");
    }).catch((err)=>{
      console.log("Erro ao salvar: "+err);
    })
})           

module.exports = router;
