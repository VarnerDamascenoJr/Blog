const express = require('express');
const router  = express.Router();

router.get('/',(req, res)=>{
  res.render("admin/index");
});

router.get('/posts',(req, res)=>{
  res.render("pagina de post")
});
router.get('/categorias',(req, res)=>{
  res.get("Ola caralhinhi")
})

module.exports = router;
