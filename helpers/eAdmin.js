//A funcão desta parte é verificar se está autenticado e se é administrador
module.exports = {
  eAdmin: function(req, res, next){
    if(req.isAuthenticated() && req.user.eAdmin ==1){
      return next();
    }
    req.flash("error_msg", "Você não fez o login corretamente")
    res.redirect("/")

  }
}
