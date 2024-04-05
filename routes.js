const express = require('express')
const route = express.Router()
const loginController = require('./src/controllers/LoginController')
const homeController = require('./src/controllers/homeController')

loginRequire = (req, res, next)=>{
    if(!req.session.user){
        res.render('404')
        return
    }    
    next()
}

//Rotas de login
route.get('/login',loginController.paginaLogin )
route.post('/login/login',loginController.login )
route.get('/login/logout', loginController.logout)

route.get('/register', loginController.paginaRegister)
route.post('/register/register', loginController.register)

// Rotas da home
route.get('/',loginRequire, homeController.index)

module.exports = route