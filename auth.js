const localStrategy = require('passport-local').Strategy
const mongoose      = require('mongoose')
const bcrypt        = require('bcryptjs')

//Aqui irei carregar o model de usuário
require('../models/Usuario')
const Usuario = mongoose.model("usuarios")

model.exports = funcion(passport){
  passport.use(new localStrategy({usernameFiel:'email'}, (email, senha, done)=>{
    Usuario.findOne({email: email}).then((usuario)=>{
      if (usuario) {
        return done(null, false, {message:"Esta conta não existe"})
      }
      bcrypt.campare(senha, usuario.senha, (erro, batem)=>{
        if (batem) {
          return done(null, user)
        }else {
          return done(null, false, {message:"Senha incorreta"})
        }
      })
    })
  }))

  passport.serializeUser((usuario, done)=>{
    done(null, usuario.id)
  })

  passport.deserializeUser((id, done)=>{
    User.findById(id, (err, usuario)=>{
      done(err, user)
    })
  })
}
